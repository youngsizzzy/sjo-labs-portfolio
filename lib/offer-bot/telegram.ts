import { normalizePhoneNumber } from './phone';

export interface OfferLeadPayload {
  name: string;
  business: string;
  what_it_does: string;
  whatsapp: string;
  summary?: string;
  sourceType: 'bot' | 'claim_form';
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatLagosTime(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date) + ' (WAT)';
  } catch {
    return date.toISOString();
  }
}

/**
 * Builds the formatted Telegram message for an offer lead.
 * Uses the LEAD's own normalized number for the WhatsApp link.
 */
export function buildOfferTelegramMessage(lead: OfferLeadPayload): string {
  const header =
    lead.sourceType === 'bot'
      ? '<b>New lead: founding offer page bot</b>'
      : '<b>Founding offer page: claim form</b>';

  // Normalize using lead's own number
  const normalizedPhone = normalizePhoneNumber(lead.whatsapp) || lead.whatsapp.replace(/\D/g, '');
  const waUrl = normalizedPhone ? `https://wa.me/${normalizedPhone}` : escapeHtml(lead.whatsapp);
  const time = formatLagosTime();

  return [
    header,
    `<b>Name:</b> ${escapeHtml(lead.name.trim())}`,
    `<b>Business:</b> ${escapeHtml(lead.business.trim())}`,
    `<b>What they do:</b> ${escapeHtml(lead.what_it_does.trim())}`,
    `<b>WhatsApp:</b> ${waUrl}`,
    `<b>Summary:</b> ${escapeHtml(lead.summary?.trim() || 'Founding client spot reservation')}`,
    `<b>Time:</b> ${time}`,
  ].join('\n');
}

export interface TelegramSendResult {
  success: boolean;
  status: number;
  error?: string;
}

/**
 * Sends a Telegram message via the Bot API.
 * Never logs user credentials or full sensitive payloads on failure.
 */
export async function sendOfferTelegramNotification(lead: OfferLeadPayload): Promise<TelegramSendResult> {
  const token = process.env.OFFER_TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.OFFER_TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn('[OfferTelegram] Skipped: OFFER_TELEGRAM_BOT_TOKEN or OFFER_TELEGRAM_CHAT_ID not configured.');
    return { success: false, status: 0, error: 'Telegram credentials not configured' };
  }

  const messageText = buildOfferTelegramMessage(lead);

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[OfferTelegram] Telegram Bot API returned status ${res.status}: ${errText.slice(0, 100)}`);
      return { success: false, status: res.status, error: errText.slice(0, 100) };
    }

    return { success: true, status: res.status };
  } catch (err: any) {
    console.error('[OfferTelegram] Dispatch network error:', err?.message || 'Unknown network error');
    return { success: false, status: 500, error: err?.message || 'Network error' };
  }
}
