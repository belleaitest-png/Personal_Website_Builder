// api/contact.js - Vercel serverless function
// Contact form handler. Email address is in CONTACT_EMAIL env var only - never in code.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, newsletter } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_KEY    = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

  if (!RESEND_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  if (!CONTACT_EMAIL) {
    console.error('CONTACT_EMAIL not set');
    return res.status(500).json({ error: 'Contact destination not configured' });
  }

  async function send(payload) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`Resend ${r.status}: ${err}`);
    }
    return r.json();
  }

  // Non-blocking Notion integration
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DB_ID = process.env.NOTION_CONTACTS_DB_ID;

  async function saveToNotion() {
    if (!NOTION_TOKEN || !NOTION_DB_ID) {
      console.warn('Notion not configured - skipping database save');
      return;
    }

    try {
      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parent: { database_id: NOTION_DB_ID },
          properties: {
            Name: {
              title: [{ text: { content: name } }],
            },
            Email: {
              email: email,
            },
            Message: {
              rich_text: [{ text: { content: message } }],
            },
            Newsletter: {
              checkbox: newsletter || false,
            },
            Date: {
              date: { start: new Date().toISOString().split('T')[0] },
            },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Notion API error (${response.status}): ${error}`);
      }
    } catch (err) {
      console.error('Failed to save to Notion:', err.message);
      // Don't throw - we don't want Notion failures to break the contact form
    }
  }

  try {
    // 1. Save to Notion (non-blocking)
    saveToNotion();

    // 2. Notify Belle
    const newsletterTag = newsletter ? ' + newsletter signup' : '';
    await send({
      from:    'Belle Body Website <hello@annabellebody.com>',
      to:      [CONTACT_EMAIL],
      subject: `New message from ${name}${newsletterTag}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;padding:32px;background:#FAF7F2;border-radius:6px;">
          <h2 style="font-size:20px;color:#1A1527;margin-bottom:24px;">New message via annabellebody.com</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px;color:#58536A;">
            <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;width:110px;">Name</td><td>${e(name)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;">Email</td>
                <td><a href="mailto:${e(email)}" style="color:#8B1A4A;">${e(email)}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#1A1527;">Newsletter</td>
                <td>${newsletter ? 'Yes - add them' : 'No'}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#fff;border-left:3px solid #C4943A;border-radius:2px;">
            <p style="font-size:15px;line-height:1.75;color:#1A1527;margin:0;">${e(message).replace(/\n/g,'<br/>')}</p>
          </div>
          <p style="font-size:12px;color:#aaa;margin-top:24px;">Sent from annabellebody.com contact form</p>
        </div>`,
    });

    // 2. Auto-reply to sender
    const firstName = e(name.split(' ')[0]);
    const newsletterLine = newsletter
      ? `<p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:16px;">I have added you to the newsletter - you will hear from me when new research, protocols, and writing drops.</p>`
      : '';
    await send({
      from:    'Belle Body <hello@annabellebody.com>',
      to:      [email],
      subject: 'Got your message - Belle Body',
      html: `
        <div style="font-family:Georgia,serif;max-width:540px;margin:0 auto;padding:40px 32px;background:#12101E;color:#F5EDD8;border-radius:6px;">
          <p style="font-family:sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C4943A;margin-bottom:28px;">annabellebody.com</p>
          <h1 style="font-size:26px;font-weight:700;line-height:1.2;margin-bottom:20px;">Thanks for reaching out, ${firstName}.</h1>
          <p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:16px;">Your message landed. I read everything personally and will be in touch soon.</p>
          ${newsletterLine}
          <p style="font-size:15px;line-height:1.8;color:rgba(245,237,216,.75);margin-bottom:32px;">Until then - <em style="color:#8B1A4A;">stay curious</em>.</p>
          <a href="https://annabellebody.com" style="display:inline-block;padding:13px 26px;background:#8B1A4A;color:#fff;text-decoration:none;font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:2px;">Explore the Site</a>
          <p style="font-family:sans-serif;font-size:12px;color:rgba(245,237,216,.2);margin-top:36px;">Belle Body - annabellebody.com</p>
        </div>`,
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Contact handler error:', err.message);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}

function e(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
