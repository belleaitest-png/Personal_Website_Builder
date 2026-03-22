# Deploy to annabellebody.com

These instructions push the new site to GitHub and auto-deploy to Vercel.

---

## One-time setup (if not done already)

1. **Clone the existing repo locally** (skip if you already have it):
   ```bash
   git clone https://github.com/belleaitest-png/Personal_Website_Builder.git
   cd Personal_Website_Builder
   ```

2. **Confirm Vercel is connected to this repo** — log in at vercel.com, open the project, and confirm the GitHub repo is `belleaitest-png/Personal_Website_Builder`.

3. **Confirm the Resend API key is set in Vercel:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Confirm `RESEND_API_KEY` exists with the value from your RESEND_API_KEY.txt file
   - ⚠️ Do NOT commit the .txt file to GitHub — delete it from your outputs folder after reading it

---

## Deploying new files

### Step 1 — Copy the new site files into the repo

Copy everything from the `belle-website` outputs folder into your cloned repo root, overwriting what's there:

```
belle-website/
  index.html          → repo root
  vercel.json         → repo root
  api/
    send-email.js     → repo/api/send-email.js
  images/
    *.jpg  *.png      → repo/images/
```

> You can drag-and-drop in Finder/Explorer, or use the terminal:
> ```bash
> cp -r /path/to/belle-website/* /path/to/Personal_Website_Builder/
> ```

### Step 2 — Stage and commit

```bash
cd Personal_Website_Builder

git add index.html vercel.json api/send-email.js images/
git commit -m "New site: name-behind-photo hero, real photos, email capture"
```

### Step 3 — Push to GitHub

```bash
git push origin main
```

Vercel detects the push automatically and deploys within ~60 seconds.
Watch the deployment at: https://vercel.com/dashboard

### Step 4 — Verify live

Open https://annabellebody.com and check:
- [ ] Hero loads with name behind the photo
- [ ] Orbit bubbles appear as you scroll
- [ ] Subsequent sections scroll over the sticky hero
- [ ] Email capture form sends the paper (test with your own email)
- [ ] Nav links work and nav bar appears on scroll

---

## If you need to update the Resend API key in Vercel

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit `RESEND_API_KEY` → paste new key → Save
3. Go to Deployments → click the latest → Redeploy (to pick up the new env var)

---

## File structure reference

```
Personal_Website_Builder/
├── index.html          ← Single-page website
├── vercel.json         ← Rewrites /api/* to serverless functions
├── api/
│   └── send-email.js   ← Serverless function: handles Resend email
└── images/
    ├── photo-stage-burgundy.png     ← Hero photo (cutout)
    ├── photo-hbs-portrait.jpg       ← About section
    ├── photo-hyrox-finish.jpg       ← Building section sticky col
    ├── photo-farm.jpg               ← Protocols section
    ├── photo-hbs-sign.jpg           ← Photo strip
    ├── photo-patagonia-wild.jpg     ← Photo strip
    ├── photo-mountain.jpg           ← Photo strip
    ├── photo-social-1.jpg           ← Photo strip
    └── ...
```
