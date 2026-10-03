import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { AI_BOT_SYSTEM_PROMPT } from '@/lib/botKnowledge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is missing on the server.' },
        { status: 500 }
      );
    }

    // Format conversation history for Groq API
    const formattedMessages = [
      { role: 'system', content: AI_BOT_SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content || '',
      })),
    ];

    const primaryModel = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    const candidateModels = Array.from(
      new Set([primaryModel, 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'openai/gpt-oss-20b'])
    );

    let rawReply = '';
    let lastError = '';

    for (const modelName of candidateModels) {
      try {
        console.log(`Sending bot chat query to Groq using model: ${modelName}`);
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modelName,
            messages: formattedMessages,
            temperature: 0.6,
            max_tokens: 1024,
          }),
        });

        if (!groqRes.ok) {
          const errText = await groqRes.text();
          console.warn(`Groq bot model ${modelName} returned error ${groqRes.status}:`, errText);
          lastError = `Groq Error (${groqRes.status}): ${errText}`;
          continue;
        }

        const groqJson = await groqRes.json();
        const choiceMsg = groqJson.choices?.[0]?.message;
        rawReply = choiceMsg?.content || choiceMsg?.reasoning || choiceMsg?.reasoning_content || '';

        if (rawReply.trim()) {
          break;
        }
      } catch (err: any) {
        console.error(`Error with Groq model ${modelName}:`, err);
        lastError = err?.message || 'Groq fetch error';
      }
    }

    if (!rawReply.trim()) {
      return NextResponse.json(
        { error: lastError || 'Failed to generate response from AI model.' },
        { status: 500 }
      );
    }

    let leadCaptured = false;
    let cleanReply = rawReply;

    // Detect if the bot closed a lead with [[SUBMIT_LEAD:{...}]] tag
    const submitTagRegex = /\[\[SUBMIT_LEAD:([\s\S]*?)\]\]/;
    const match = rawReply.match(submitTagRegex);


    if (match && match[1]) {
      try {
        const leadData = JSON.parse(match[1].trim());
        cleanReply = rawReply.replace(submitTagRegex, '').trim();

        // 1. Insert captured lead into Supabase Postgres database
        const supabase = createClient();
        const leadId = `lead-${Date.now()}`;
        const newLead = {
          id: leadId,
          created_at: new Date().toISOString(),
          name: leadData.name || 'AI Chat Lead',
          email: leadData.email || 'not-provided@sjolabs.com',
          business_name: leadData.business_name || '',
          country: leadData.country || 'USA',
          service: leadData.service || 'Web Engineering',
          budget: leadData.budget || 'Not specified',
          message: leadData.message || 'Captured via SJO AI Concierge Chatbot',
          website_url: leadData.website_url || '',
          source_page: '/bot-chat',
          referral_source: 'SJO AI Concierge',
          status: 'New',
        };

        const { error: dbErr } = await supabase.from('leads').insert([newLead]);
        if (dbErr) console.error('Supabase AI Bot lead insert error:', dbErr);
        else {
          leadCaptured = true;
          console.log('AI Bot successfully captured & saved lead to Supabase:', leadId);
        }

        // 2. Dispatch Email Notification to sjolabs8@gmail.com
        const notificationEmail = (process.env.CONTACT_NOTIFICATION_EMAIL || 'sjolabs8@gmail.com').trim();
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey.trim()}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: process.env.CONTACT_FROM_EMAIL || 'SJO LABS <onboarding@resend.dev>',
              to: [notificationEmail],
              subject: `🤖 AI Bot Closed New Lead: ${newLead.name} (${newLead.service})`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background-color: #090D16; color: #F8FAFC; border-radius: 16px;">
                  <h2 style="color: #00F0FF; margin-top: 0;">🤖 SJO AI Concierge Closed a New Lead!</h2>
                  <p style="color: #94A3B8;">Your 24/7 AI chatbot qualified and captured this inquiry while you were away:</p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 16px; color: #E2E8F0;">
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Name:</td><td><strong>${newLead.name}</strong></td></tr>
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Email:</td><td><a href="mailto:${newLead.email}" style="color: #00F0FF;">${newLead.email}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Business:</td><td>${newLead.business_name || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Service Needed:</td><td style="color: #00F0FF;"><strong>${newLead.service}</strong></td></tr>
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Budget:</td><td>${newLead.budget}</td></tr>
                    <tr><td style="padding: 8px 0; color: #94A3B8;">Details:</td><td>${newLead.message}</td></tr>
                  </table>
                </div>
              `,
            }),
          }).catch((err) => console.error('AI Bot Resend email dispatch error:', err));
        }
      } catch (parseErr) {
        console.error('Error parsing SUBMIT_LEAD JSON in bot API:', parseErr);
      }
    }

    return NextResponse.json({
      success: true,
      reply: cleanReply,
      leadCaptured,
    });
  } catch (error: any) {
    console.error('Server error in /api/bot/chat:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
