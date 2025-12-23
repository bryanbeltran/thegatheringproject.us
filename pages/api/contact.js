// Using Resend API (recommended) - no password needed, just an API key
// Alternative: You can use SendGrid, Mailgun, or other services similarly

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Option 1: Using Resend (recommended - free tier available)
    // Sign up at https://resend.com and get an API key
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'The Gathering Project <contact@thegatheringproject.us>',
          to: process.env.CONTACT_EMAIL || 'aziz.abdulrahmane@gmail.com',
          reply_to: `${name} <${email}>`,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>You can reply directly to this email to respond to ${name}.</em></p>
          `,
          text: `
New contact form submission from The Gathering Project website:

Name: ${name}
Email: ${email}

Message:
${message}
          `,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send email');
      }

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    }

    // Option 2: Fallback to simple mailto link (no backend needed)
    // This is a fallback if no email service is configured
    // In production, you should use a proper email service
    return res.status(200).json({ 
      success: true, 
      message: 'Message received. Please configure an email service for automatic delivery.',
      fallback: true 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later or contact us directly at aziz.abdulrahmane@gmail.com.' 
    });
  }
}

