// Vercel Serverless Function — /api/send-email
// Called by the website's email capture form.
// RESEND_API_KEY is set as an environment variable in Vercel (never in code).

import fs   from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const RESEND_KEY  = process.env.RESEND_API_KEY;
  const BELLE_EMAIL = process.env.CONTACT_EMAIL;
  const FROM        = 'Belle Body <hello@annabellebody.com>';

  if (!RESEND_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Read PDF attachment
  let pdfBase64;
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'birth-rates-paper.pdf');
    pdfBase64 = fs.readFileSync(pdfPath).toString('base64');
  } catch (err) {
    console.error('Could not read PDF:', err.message);
    return res.status(500).json({ error: 'Paper file not found' });
  }

  async function send(payload) {
    const r = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
      body:    JSON.stringify(payload),
    });
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`Resend error ${r.status}: ${err}`);
    }
    return r.json();
  }

  try {
    // 1. Notify Belle
    if (BELLE_EMAIL) {
      await send({
        from:    FROM,
        to:      [BELLE_EMAIL],
        subject: `📩 New paper request — ${email}`,
        html: `
          <p style="font-family:sans-serif; font-size:15px;">
            <strong>${email}</strong> just requested the birth rates paper from your website.<br><br>
            The PDF has been sent to them as an attachment.
          </p>
        `,
      });
    }

    // 2. Send paper to reader with PDF attached
    await send({
      from:     FROM,
      to:       [email],
      reply_to: 'hello@annabellebody.com',
      subject:  'Your paper: Will the Market Respond to Declining Birth Rates?',
      attachments: [
        {
          filename: 'Will the Market Respond to Declining Birth Rates - Belle Body.pdf',
          content:  pdfBase64,
        },
      ],
      html: `
        <div style="font-family:Georgia,serif; max-width:560px; margin:0 auto; color:#1A1527; padding:40px 24px;">
          <p style="font-size:13px; letter-spacing:0.15em; text-transform:uppercase; color:#C4943A; margin-bottom:32px; font-family:sans-serif;">
            BELLE BODY
          </p>
          <p style="font-size:18px; line-height:1.6; margin-bottom:20px;">Hi,</p>
          <p style="font-size:16px; line-height:1.8; margin-bottom:24px;">
            Thanks for your interest — really glad it caught your eye.
            The paper is attached to this email.
          </p>
          <p style="font-size:15px; line-height:1.8; color:#58536A; margin-bottom:20px;">
            This is the first in a series I'm publishing on the macro trends I think matter most —
            food systems, AI, female health, and a few others.
            I'd love to know what you think.
          </p>
          <p style="font-size:15px; line-height:1.8; color:#58536A; margin-bottom:32px;">
            Feel free to reply directly to this email any time.
          </p>
          <p style="font-size:15px; color:#1A1527; margin-bottom:0;">
            Belle<br>
            <a href="https://annabellebody.com" style="color:#C4943A; text-decoration:none;">
              annabellebody.com
            </a>
          </p>
          <hr style="border:none; border-top:1px solid #E9E2D4; margin:40px 0 20px;" />
          <p style="font-size:11px; color:#aaa; font-family:sans-serif; margin:0;">
            You're receiving this because you requested a paper from annabellebody.com.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Email send failed:', err.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
