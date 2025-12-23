# Email Setup Guide

The contact form uses Resend API (recommended) which only requires an API key - no passwords needed!

## Recommended: Resend (Free tier available)

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Create `.env.local`** in the root directory:
   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=aziz.abdulrahmane@gmail.com
   ```
   Note: The `FROM_EMAIL` uses Resend's default domain (`onboarding@resend.dev`). If you want to use your own domain later, you can verify it in Resend and update the API code.

## Why Resend?

- ✅ **No passwords** - Uses secure API keys only
- ✅ **Free tier** - 3,000 emails/month free
- ✅ **Simple setup** - Just one API key
- ✅ **Reliable** - Built for developers
- ✅ **No SMTP configuration** needed

## Alternative Services

If you prefer other services, you can modify `pages/api/contact.js`:

### SendGrid
- Sign up at sendgrid.com
- Get API key (not password)
- Add to `.env.local`: `SENDGRID_API_KEY=your_key`

### Mailgun
- Sign up at mailgun.com
- Get API key
- Add to `.env.local`: `MAILGUN_API_KEY=your_key`

## Testing

After setting up environment variables, restart your development server:
```bash
npm run dev
```

Test the contact form to ensure emails are being sent successfully.

