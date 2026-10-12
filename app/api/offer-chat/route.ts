import { NextRequest, NextResponse } from 'next/server';
import { fillOfferPrompt } from '@/lib/offer-bot/prompt-filler';
import {
  checkIpRateLimit,
  checkClaimFormRateLimit,
  checkSessionMessageCap,
  hasTelegramBeenDispatched,
  markTelegramDispatched,
} from '@/lib/offer-bot/rate-limiter';
import {
  sendOfferTelegramNotification,
  OfferLeadPayload,
} from '@/lib/offer-bot/telegram';
import { validateLeadFields } from '@/lib/offer-bot/phone';
import { WHATSAPP, SPOTS_LEFT } from '@/lib/offer-bot/offer-config';

// Maximum validation constraints
const MAX_TURNS = 10;
const MAX_CHAR_LENGTH = 500;
const GROQ_TIMEOUT_MS = 15000;

const FALLBACK_WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
const SAFE_FALLBACK_REPLY =
  `I'm having a brief connection delay, but Shepherd is available right now! You can tap here to continue directly on WhatsApp: ${FALLBACK_WHATSAPP_URL}`;

interface ExpectedBotResponse {
  reply: string;
  lead: {
    name: string | null;
    business: string | null;
    what_it_does: string | null;
    whatsapp: string | null;
  };
  ready_to_hand_off: boolean;
  summary: string;
}

/**
 * Validates request origin against authorized sites and Netlify preview hosts.
 * Requests with missing or empty Origin header are strictly rejected.
 */
function isOriginAllowed(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin || !origin.trim()) {
    return false; // (a) Missing or empty Origin header rejected
  }

  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();

    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === 'sjolabs.site' ||
      host.endsWith('.sjolabs.site') ||
      host === 'sjolabs.com' ||
      host.endsWith('.sjolabs.com') ||
      host === 'sjolabs-portfolio.netlify.app' ||
      host.endsWith('.netlify.app')
    ) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Extracts visitor IP.
 * Priority 1: x-nf-client-connection-ip (provided by Netlify edge)
 * Priority 2: First IP from x-forwarded-for
 * Priority 3: x-real-ip
 * Fallback: 127.0.0.1
 */
function getClientIp(req: NextRequest): string {
  const netlifyIp = req.headers.get('x-nf-client-connection-ip');
  if (netlifyIp && netlifyIp.trim()) {
    return netlifyIp.trim();
  }
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp && realIp.trim()) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Validates model output JSON schema.
 */
function validateBotJson(parsed: any): parsed is ExpectedBotResponse {
  if (!parsed || typeof parsed !== 'object') return false;
  if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) return false;
  if (typeof parsed.ready_to_hand_off !== 'boolean') return false;
  if (parsed.lead && typeof parsed.lead !== 'object') return false;
  return true;
}

/**
 * Calls Groq chat completions API with JSON mode and timeout.
 */
async function callGroqWithJsonMode(
  apiKey: string,
  model: string,
  formattedMessages: Array<{ role: string; content: string }>
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        response_format: { type: 'json_object' },
        temperature: 0.4,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      console.warn(`[OfferChat] Groq API returned status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.choices?.[0]?.message?.content || null;
  } catch (err: any) {
    clearTimeout(timer);
    console.warn(`[OfferChat] Groq request failed: ${err?.name || 'Error'}`);
    return null;
  }
}

export async function POST(req: NextRequest) {
  // 1. Origin verification
  if (!isOriginAllowed(req)) {
    return NextResponse.json(
      { error: 'Forbidden: Request origin not allowed.' },
      { status: 403 }
    );
  }

  // 2. IP Rate limiting (best-effort on serverless)
  const clientIp = getClientIp(req);
  const ipCheck = checkIpRateLimit(clientIp);
  if (!ipCheck.allowed) {
    return NextResponse.json(
      {
        error:
          'You are sending requests too quickly. Please wait a few moments or message Shepherd directly on WhatsApp.',
        whatsappLink: FALLBACK_WHATSAPP_URL,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(ipCheck.retryAfterSeconds) },
      }
    );
  }

  // 3. Body Parsing & Honeypot Check
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  // Honeypot check (hidden form field bot check)
  if (body.honeypot || body.botField) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  // 4. Special handler: Claim Modal Form submission notification
  if (body.action === 'claim_form') {
    // Stricter rate limit: 5 claim submissions per IP per hour
    const claimRateCheck = checkClaimFormRateLimit(clientIp);
    if (!claimRateCheck.allowed) {
      return NextResponse.json(
        {
          error:
            'You have exceeded the maximum number of claim submissions. Please message Shepherd directly on WhatsApp.',
          whatsappLink: FALLBACK_WHATSAPP_URL,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(claimRateCheck.retryAfterSeconds) },
        }
      );
    }

    const { name, business, what_it_does, whatsapp } = body;
    const validation = validateLeadFields({ name, business, what_it_does, whatsapp });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error || 'Invalid lead details.' },
        { status: 400 }
      );
    }

    // Server-generated summary (never accept from request body)
    const serverGeneratedSummary = `Reserved 1 of ${SPOTS_LEFT} founding spots via Claim Modal Form`;

    const formPayload: OfferLeadPayload = {
      name: validation.cleanName,
      business: validation.cleanBusiness,
      what_it_does: validation.cleanWhatItDoes,
      whatsapp: validation.cleanWhatsapp,
      summary: serverGeneratedSummary,
      sourceType: 'claim_form',
    };

    // Dispatch Telegram notification
    const sendResult = await sendOfferTelegramNotification(formPayload);

    return NextResponse.json({
      success: sendResult.success,
      delivered: sendResult.success,
      telegramStatus: sendResult.status,
    });
  }

  // 5. Chat Payload Validation
  const { sessionId, messages } = body;

  if (
    !sessionId ||
    typeof sessionId !== 'string' ||
    sessionId.length > 100 ||
    !Array.isArray(messages) ||
    messages.length === 0
  ) {
    return NextResponse.json(
      { error: 'Valid sessionId and messages array are required.' },
      { status: 400 }
    );
  }

  if (messages.length > MAX_TURNS) {
    return NextResponse.json(
      { error: `Message history cannot exceed ${MAX_TURNS} turns.` },
      { status: 400 }
    );
  }

  for (const m of messages) {
    if (
      !m ||
      typeof m !== 'object' ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length > MAX_CHAR_LENGTH
    ) {
      return NextResponse.json(
        { error: `Each message must have a valid role and be under ${MAX_CHAR_LENGTH} characters.` },
        { status: 400 }
      );
    }
  }

  // 6. Session Message Cap Check
  const sessionCheck = checkSessionMessageCap(sessionId);
  if (!sessionCheck.allowed) {
    return NextResponse.json(
      {
        error:
          'You have reached the maximum message limit for this chat. Please continue chatting with Shepherd directly on WhatsApp.',
        whatsappLink: FALLBACK_WHATSAPP_URL,
      },
      { status: 429 }
    );
  }

  // 7. Environment Variables Check
  const groqApiKey = process.env.OFFER_GROQ_API_KEY || process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    console.error('[OfferChat] GROQ API key is not configured.');
    return NextResponse.json({
      reply: SAFE_FALLBACK_REPLY,
      ready_to_hand_off: false,
      whatsappLink: FALLBACK_WHATSAPP_URL,
    });
  }

  // 8. Build filled system prompt
  let systemPrompt: string;
  try {
    systemPrompt = fillOfferPrompt();
  } catch (err: any) {
    console.error('[OfferChat] Prompt filling error:', err?.message);
    return NextResponse.json({
      reply: SAFE_FALLBACK_REPLY,
      ready_to_hand_off: false,
      whatsappLink: FALLBACK_WHATSAPP_URL,
    });
  }

  const primaryModel = process.env.OFFER_GROQ_MODEL || process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
  const modelsToTry = Array.from(
    new Set([primaryModel, 'openai/gpt-oss-120b', 'qwen/qwen3.8-27b'])
  );

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  // 9. Groq Execution with retry logic
  let botData: ExpectedBotResponse | null = null;

  for (const model of modelsToTry) {
    // Attempt 1
    const rawContent = await callGroqWithJsonMode(groqApiKey, model, formattedMessages);
    if (rawContent) {
      try {
        const parsed = JSON.parse(rawContent);
        if (validateBotJson(parsed)) {
          botData = parsed;
          break;
        }
      } catch {
        // Attempt 2 (single retry if JSON parsing fails)
        console.warn(`[OfferChat] Failed to parse JSON from ${model}, retrying once...`);
        const retryRaw = await callGroqWithJsonMode(groqApiKey, model, formattedMessages);
        if (retryRaw) {
          try {
            const retryParsed = JSON.parse(retryRaw);
            if (validateBotJson(retryParsed)) {
              botData = retryParsed;
              break;
            }
          } catch {
            // Proceed to next fallback model
          }
        }
      }
    }
  }

  // If all models failed to produce valid JSON
  if (!botData) {
    return NextResponse.json({
      reply: SAFE_FALLBACK_REPLY,
      lead: null,
      ready_to_hand_off: false,
      whatsappLink: FALLBACK_WHATSAPP_URL,
    });
  }

  // 10. Check Lead Completion & Trigger Single Telegram Notification
  const lead = botData.lead;
  if (botData.ready_to_hand_off && !hasTelegramBeenDispatched(sessionId)) {
    const leadVal = validateLeadFields(lead || {});

    if (leadVal.isValid) {
      markTelegramDispatched(sessionId);

      const leadPayload: OfferLeadPayload = {
        name: leadVal.cleanName,
        business: leadVal.cleanBusiness,
        what_it_does: leadVal.cleanWhatItDoes,
        whatsapp: leadVal.cleanWhatsapp,
        summary: botData.summary || 'Founding client candidate inquiry',
        sourceType: 'bot',
      };

      // Non-blocking Telegram notification dispatch
      sendOfferTelegramNotification(leadPayload).catch((err) => {
        console.error('[OfferChat] Telegram dispatch error:', err?.message);
      });
    }
  }

  // 11. Clean response back to client (never expose prompt or internals)
  return NextResponse.json({
    reply: botData.reply,
    lead: botData.lead,
    ready_to_hand_off: botData.ready_to_hand_off,
    summary: botData.summary || '',
  });
}

export function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed. POST only.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
