// api/send-document.js - Vercel serverless function
// Sends a document (PDF) to the requester's email via Resend,
// and notifies Belle of the request.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, documentPath, documentName } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!documentPath) {
    return res.status(400).json({ error: 'No document specified' });
  }

  const RESEND_KEY  = process.env.RESEND_API_KEY;
  const BELLE_EMAIL = process.env.CONTACT_EMAIL;
  const FROM        = 'Belle Body <hello@annabellebody.com>';

  if (!RESEND_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const filename = documentName || decodeURIComponent(documentPath.split('/').pop());
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host     = req.headers.host;
  const docUrl   = `${protocol}://${host}${encodeURI(decodeURI(documentPath))}`;

  async function send(payload) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`Resend ${r.status}: ${err}`);
    }
    return r.json();
  }

  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  try {
    // 1. Notify Belle
    if (BELLE_EMAIL) {
      await send({
        from: FROM,
        to: [BELLE_EMAIL],
        subject: `Document request - ${email}`,
        html: `
          <p style="font-family:sans-serif;font-size:15px;">
            <strong>${esc(email)}</strong> requested: <em>${esc(filename)}</em>
          </p>
        `,
      });
    }

    // 2. Send document to requester
    await send({
      from: FROM,
      to: [email],
      reply_to: 'hello@annabellebody.com',
      subject: `Your document: ${filename}`,
      attachments: [{
        filename,
        path: docUrl,
      }],
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1A1527;padding:40px 24px;">
          <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#C4943A;margin-bottom:32px;font-family:sans-serif;">
            BELLE BODY
          </p>
          <p style="font-size:18px;line-height:1.6;margin-bottom:20px;">Hi,</p>
          <p style="font-size:16px;line-height:1.8;margin-bottom:24px;">
            Thanks for your interest - the document is attached to this email.
          </p>
          <p style="font-size:15px;line-height:1.8;color:#58536A;margin-bottom:32px;">
            Feel free to reply directly to this email any time. I'd love to know what you think.
          </p>
          <p style="font-size:15px;color:#1A1527;margin-bottom:0;">
            Belle<br>
            <a href="https://annabellebody.com" style="color:#C4943A;text-decoration:none;">annabellebody.com</a>
          </p>
          <hr style="border:none;border-top:1px solid #E9E2D4;margin:40px 0 20px;" />
          <p style="font-size:11px;color:#aaa;font-family:sans-serif;margin:0;">
            You received this because you requested a document from annabellebody.com.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Send document failed:', err.message);
    return res.status(500).json({ error: 'Failed to send document' });
  }
}
