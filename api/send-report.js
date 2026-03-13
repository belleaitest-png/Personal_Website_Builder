const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, organisation, reason } = req.body;

  if (!email || !reason) {
    return res.status(400).json({ error: 'Email and reason are required.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Read the report to attach
  const reportPath = path.join(__dirname, '..', 'How Will the Free Market Respond to Global Birth Rate Decline_ A Comprehensive Analysis (3).docx');
  let attachment;
  try {
    const fileBuffer = fs.readFileSync(reportPath);
    attachment = {
      filename: 'How Will the Free Market Respond to Global Birth Rate Decline - Annabelle Body.docx',
      content: fileBuffer,
    };
  } catch (err) {
    console.error('Could not read report file:', err.message);
    return res.status(500).json({ error: 'Report file not found on server.' });
  }

  try {
    // Send the report to the requester
    await resend.emails.send({
      from: 'Annabelle Body <report@annabellebody.com>',
      to: email,
      subject: 'Your Birth Rates Report from Annabelle Body',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #2C2528;">
          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #722F37;">Here's Your Report</h1>
          <p>Hi there,</p>
          <p>Thanks for your interest! Please find the birth rates report attached to this email.</p>
          <p style="color: #7A7075; font-size: 14px; margin-top: 32px;">— Annabelle Body</p>
        </div>
      `,
      attachments: [attachment],
    });

    // Notify Annabelle about the download request
    await resend.emails.send({
      from: 'Website <report@annabellebody.com>',
      to: 'belleaitest@gmail.com',
      subject: 'New Report Download Request',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #2C2528;">
          <h2 style="font-family: Georgia, serif; color: #722F37;">New Report Download</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organisation:</strong> ${organisation || 'Not provided'}</p>
          <p><strong>Reason / Interest:</strong> ${reason}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};
