# thegatheringproject.us

This repository contains the code and documentation for the website of the nonprofit "The Gathering Project".

## Tech stack
- **Framework**: Next.js 14
- **Hosting & CI/CD**: Vercel
- **Registrar**: Cloudflare
- **Version Control**: GitHub
- **Email Service**: Resend

## About The Gathering Project
A nonprofit organization. Website: [thegatheringproject.us](https://thegatheringproject.us)

## Setup & Development

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Required: Resend API key for contact form
RESEND_API_KEY=re_your_api_key_here

# Optional: Contact email (defaults to aziz.abdulrahmane@gmail.com)
CONTACT_EMAIL=aziz.abdulrahmane@gmail.com

# Optional: Google Analytics ID (if using analytics)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Sentry DSN (if using error monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### Running Locally
```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
├── components/          # React components (Layout, ErrorBoundary)
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints (contact form)
│   ├── index.js       # Home page
│   ├── about.js       # About/Our Gatherings page
│   └── contact.js     # Contact page
├── public/            # Static assets
│   ├── gallery/       # Event photos
│   └── logos/         # Partner logos
├── styles/            # Global CSS
└── scripts/           # Utility scripts
```

## Deployment

The site is automatically deployed to Vercel on push to the main branch.

### Environment Variables in Vercel
Ensure the following are set in Vercel dashboard (Settings > Environment Variables):
- `RESEND_API_KEY` - Required for contact form
- `CONTACT_EMAIL` - Optional, defaults to aziz.abdulrahmane@gmail.com

## Optional Features

### Analytics (Google Analytics)
To enable Google Analytics:
1. Get your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
2. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Add to Vercel environment variables for production

### Error Monitoring (Sentry)
To enable Sentry error monitoring:
1. Create a Sentry account at https://sentry.io
2. Create a new project and get your DSN
3. Install Sentry: `npm install @sentry/nextjs`
4. Add Sentry initialization to `pages/_app.js` (see Sentry docs for Next.js setup)
5. Add to `.env.local`: `NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx`
6. Add to Vercel environment variables for production

Note: The ErrorBoundary component is already set up to send errors to Sentry if `window.Sentry` is available. Analytics and error monitoring are optional and will gracefully degrade if not configured.

## Features

- ✅ Responsive design
- ✅ Accessibility (WCAG 2.1 AA compliant)
- ✅ Contact form with email integration
- ✅ Image gallery with lightbox
- ✅ SEO optimized
- ✅ Error boundary for graceful error handling
- ✅ Optional Google Analytics integration
- ✅ Optional Sentry error monitoring

