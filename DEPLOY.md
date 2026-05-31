# Sakshi Chib Portfolio — Deployment Guide

## Project Structure

```
sakshi-portfolio/
├── package.json          ← Node.js project config
├── server/
│   └── index.js          ← Express backend (contact form API)
└── public/
    └── index.html        ← Full portfolio website (frontend)
```

---

## Local Development

### Prerequisites
- Node.js 18+ → https://nodejs.org

### Steps

```bash
# 1. Enter the project folder
cd sakshi-portfolio

# 2. Install dependencies
npm install

# 3. Start the server
npm start
# → Opens at http://localhost:3000
```

For auto-restart on file changes during development:
```bash
npm run dev
```

---

## Deployment Options

### Option A — Render (Recommended, Free)

1. Push your project to a GitHub repository
2. Go to https://render.com and sign up (free)
3. Click **New → Web Service**
4. Connect your GitHub repo
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Click **Deploy** — your site will be live at `https://your-name.onrender.com`

✅ Free tier · Automatic HTTPS · Auto-redeploys on git push

---

### Option B — Railway (Fast & Easy)

1. Go to https://railway.app and sign up
2. Click **New Project → Deploy from GitHub**
3. Select your repo
4. Railway auto-detects Node.js and deploys
5. Click **Generate Domain** to get a free URL

✅ Free tier (500 hrs/month) · Very fast deploys

---

### Option C — Vercel (Static + Serverless)

Vercel works best for static sites. To use it with the backend:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Create `vercel.json` in your project root:
   ```json
   {
     "version": 2,
     "builds": [{ "src": "server/index.js", "use": "@vercel/node" }],
     "routes": [
       { "src": "/api/(.*)", "dest": "server/index.js" },
       { "src": "/(.*)", "dest": "public/$1" }
     ]
   }
   ```
3. Run:
   ```bash
   vercel
   ```
4. Follow the prompts — your site deploys in seconds.

✅ Free tier · Instant deployments · Global CDN

---

### Option D — Netlify (Frontend only, simplest)

If you only want to host the HTML without the backend:

1. Go to https://netlify.com
2. Drag and drop the `public/` folder onto the Netlify dashboard
3. Done — live in seconds with a free URL

Note: The contact form won't work without the Node.js backend. Use Netlify Forms or Formspree as an alternative.

---

## Adding a Custom Domain (e.g. sakshichib.com)

1. Buy a domain at Namecheap, GoDaddy, or Google Domains (~$12/year)
2. In your hosting dashboard (Render/Railway/Vercel), add your custom domain
3. Point your domain's DNS to the provided nameservers or CNAME record
4. HTTPS is automatically provisioned — usually takes 5–15 minutes

---

## Making the Contact Form Actually Send Emails

Currently the form saves messages in memory (they're lost on restart). To send real emails, add **Resend** (free 3,000 emails/month):

1. Sign up at https://resend.com
2. Get your API key
3. Install the SDK:
   ```bash
   npm install resend
   ```
4. Add to `server/index.js` inside the POST `/api/contact` route:
   ```javascript
   const { Resend } = require('resend');
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: 'noreply@yourdomain.com',
     to: 'sakshichib5@gmail.com',
     subject: `Portfolio contact: ${subject}`,
     html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
   });
   ```
5. Set `RESEND_API_KEY` as an environment variable in your hosting dashboard

---

## Environment Variables

Set these in your hosting platform's dashboard (never commit them to Git):

| Variable | Description |
|---|---|
| `PORT` | Server port (auto-set by most platforms) |
| `RESEND_API_KEY` | Email API key (optional, for sending emails) |

---

## Quick Checklist Before Going Live

- [ ] Add your real profile photo (replace the `S` placeholder in `index.html`)
- [ ] Verify all links (LinkedIn, email)
- [ ] Test the contact form end-to-end
- [ ] Set up a custom domain
- [ ] Set up email notifications via Resend
