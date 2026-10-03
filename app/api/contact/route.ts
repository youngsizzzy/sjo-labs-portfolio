import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      business_name,
      country,
      service,
      budget,
      referral_source,
      message,
      website_url,
      source_page,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and project details are required.' },
        { status: 400 }
      );
    }

    const notificationEmail = (
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.ADMIN_EMAIL ||
      'sjolabs8@gmail.com'
    ).trim();

    const fromEmail = (
      process.env.CONTACT_FROM_EMAIL ||
      'SJO LABS <onboarding@resend.dev>'
    ).trim();

    const resendApiKey = process.env.RESEND_API_KEY;

    let dbSaved = false;
    let dbError = '';

    // Step A: Save Lead to Supabase Postgres Database
    try {
      const supabase = createClient();
      const newLead = {
        id: `lead-${Date.now()}`,
        created_at: new Date().toISOString(),
        name,
        email,
        business_name: business_name || '',
        country: country || 'USA',
        service: service || 'Web Engineering',
        budget: budget || 'Not specified',
        message,
        website_url: website_url || '',
        source_page: source_page || '/services',
        referral_source: referral_source || 'Website',
        status: 'New',
      };

      const { error: insertError } = await supabase.from('leads').insert([newLead]);
      if (insertError) {
        console.error('Supabase lead insert error in /api/contact:', insertError);
        dbError = insertError.message;
      } else {
        dbSaved = true;
        console.log('Lead successfully saved to Supabase Postgres database:', newLead.id);
      }
    } catch (err: any) {
      console.error('Unexpected error saving lead to Supabase:', err);
      dbError = err?.message || 'Database error';
    }

    let emailSent = false;
    let emailProvider = 'none';
    let emailError = '';

    // Step B: Dispatch via Resend API (Direct REST endpoint with custom domain support)
    if (resendApiKey) {
      try {
        console.log(`Dispatching lead via Resend API from ${fromEmail} to ${notificationEmail}...`);
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notificationEmail],
            subject: `🚀 New Project Enquiry: ${name} (${service || 'Web Engineering'})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background-color: #090D16; color: #F8FAFC; border-radius: 16px;">
                <h2 style="color: #00F0FF; margin-top: 0; font-size: 22px; border-bottom: 1px solid #1E293B; padding-bottom: 12px;">
                  🚀 New Lead Submitted on SJO LABS
                </h2>

                <table style="width: 100%; border-collapse: collapse; margin-top: 16px; color: #E2E8F0; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold; width: 140px;">Client Name:</td>
                    <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Work Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00F0FF;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Business Name:</td>
                    <td style="padding: 8px 0;">${business_name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Country:</td>
                    <td style="padding: 8px 0;">${country || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Service Needed:</td>
                    <td style="padding: 8px 0; color: #00F0FF; font-weight: bold;">${service || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Approx. Budget:</td>
                    <td style="padding: 8px 0;">${budget || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Referral Source:</td>
                    <td style="padding: 8px 0;">${referral_source || 'N/A'}</td>
                  </tr>
                  ${website_url ? `
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Existing Website:</td>
                    <td style="padding: 8px 0;"><a href="${website_url}" style="color: #00F0FF;" target="_blank">${website_url}</a></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #94A3B8; font-weight: bold;">Source Page:</td>
                    <td style="padding: 8px 0; font-family: monospace;">${source_page || '/services'}</td>
                  </tr>
                </table>

                <div style="margin-top: 20px; padding: 16px; background-color: #0F172A; border-left: 4px solid #00F0FF; border-radius: 8px;">
                  <div style="color: #94A3B8; font-size: 12px; font-weight: bold; uppercase; margin-bottom: 6px;">Project Details & Description:</div>
                  <div style="color: #F8FAFC; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>

                <div style="margin-top: 24px; text-align: center; border-top: 1px solid #1E293B; padding-top: 16px; font-size: 11px; color: #64748B;">
                  SJO LABS® Lead Capture Engine • Automatically Dispatched from Website
                </div>
              </div>
            `,
          }),
        });

        const resendJson = await resendRes.json();
        console.log('Resend API Response:', resendRes.status, resendJson);

        if (resendRes.ok) {
          emailSent = true;
          emailProvider = 'Resend API';
        } else {
          emailError = `Resend Error (${resendRes.status}): ${JSON.stringify(resendJson)}`;
        }
      } catch (err: any) {
        console.error('Failed to send email via Resend API:', err);
        emailError = err?.message || 'Resend fetch error';
      }
    }

    // Step C: Fallback to FormSubmit AJAX Service if Resend was not executed or failed
    if (!emailSent) {
      try {
        console.log(`Fallback dispatching lead via FormSubmit to ${notificationEmail}...`);
        const fsRes = await fetch(`https://formsubmit.co/ajax/${notificationEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Referer': 'https://sjolabs.com',
            'Origin': 'https://sjolabs.com',
          },
          body: JSON.stringify({
            _subject: `🚀 New Lead: ${name} (${service || 'Web Engineering'})`,
            _template: 'table',
            'Client Name': name,
            'Client Email': email,
            'Business Name': business_name || 'N/A',
            'Country': country || 'N/A',
            'Service Needed': service || 'N/A',
            'Approx. Budget': budget || 'N/A',
            'Referral Source': referral_source || 'N/A',
            'Existing Website': website_url || 'N/A',
            'Source Page': source_page || '/services',
            'Project Description': message,
          }),
        });

        const fsJson = await fsRes.json();
        console.log('FormSubmit API Response:', fsRes.status, fsJson);

        if (fsRes.ok && (fsJson.success === 'true' || fsJson.success === true || fsJson.message?.includes('Activation'))) {
          emailSent = true;
          emailProvider = 'FormSubmit';
        }
      } catch (fsErr: any) {
        console.error('FormSubmit dispatch error:', fsErr);
        if (!emailError) emailError = fsErr?.message || 'FormSubmit error';
      }
    }

    console.log(`Lead submission processing finished for ${name} (${email}). DB Saved: ${dbSaved}, Email Sent: ${emailSent} via ${emailProvider}`);

    return NextResponse.json({
      success: true,
      message: 'Lead submission recorded successfully.',
      dbSaved,
      emailSent,
      emailProvider,
      emailError: emailError || null,
      notificationEmail,
      fromEmail,
    });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
