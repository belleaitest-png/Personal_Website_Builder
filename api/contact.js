// api/contact.js — Vercel serverless function
// Handles the contact form + newsletter checkbox.
// Belle's email address lives ONLY in the CONTACT_EMAIL environment variable
// set in Vercel — it is never in client-side code or this repo.

const RESEND_KEY    = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, newsletter } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!RESEND_KEY || !CONTACT_EMAIL) {
    console.error('Missing env vars: RESEND_API_KEY or CONTACT_EMAIL');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // 1. Notify Belle
    const notifyRes = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Belle Body Website <hello@annabellebody.com>',
        to:      [CONTACT_EMAIL],
        subject: `New message from ${name}${newsletter ? ' 🔔 + newsletter signup' : ''}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;padding:32px;background:#FAF7F2;border-radius:6px;">
            <h2 style="font-size:20px;color:#1A1527;margin-bottom:24px;">New message via annabellebody.com</h2>
            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#58536A;">
              <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;width:110px;">Name</td><td>${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;">Email</td><td><a href="mailto:${escapeHtml(email)}" style="color:#8B1A4A;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;">Newsletter</td><td>${newsletter ? '✅ Yes — add them' : 'No'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#fff;border-left:3px solid #C4943A;border-radius:2px;">
              <p style="font-size:15px;line-height:1.75;color:#1A1527;margin:0;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
            </div>
            <p style="font-size:12px;color:#aaa;margin-top:24px;">Sent from annabellebody.com contact form</p>
          </div>
        `,
      }),
    });

    if (!notifyRes.ok) {
      const errBody = await notifyRes.text();
      console.error('Resend notify error:', errBody);
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    // 2. Auto-reply to sender
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Belle Body <hello@annabellebody.com>',
        to:      [email],
        subject: 'Got your message — Belle Body',
        html: `
          <div style="font-family:Georgia,serif;max-width:540px;margin:0 auto;padding:40px 32px;background:#12101E;color:#F5EDD8;border-radius:6px;">
            <p style="font-family:'Inter',sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C4943A;margin-bottom:28px;">annabellebody.com</p>
            <h1 style="font-size:26px;font-weight:700;line-height:1.2;margin-bottom:20px;">Thanks for reaching out, ${escapeHtml(name.split(' ')[0])}.</h1>
            <p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:16px;">Your message landed. I read everything personally and will be in touch soon.</p>
            ${newsletter ? `<p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:16px;">I've also added you to the newsletter — you'll hear from me when new research, protocols, and writing drops.</p>` : ''}
            <p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:32px;">Until then — <em style="color:#8B1A4A;">stay curious</em>.</p>
            <a href="https://annabellebody.com" style="display:inline-block;padding:13px 26px;background:#8B1A4A;color:#fff;text-decoration:none;font-family:'Inter',sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:2px;">Explore the Site →</a>
            <p style="font-family:'Inter',sans-serif;font-size:12px;color:rgba(245,237,216,.2);margin-top:36px;">Belle Body · annabellebody.com</p>
          </div>
        `,
      }),
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
