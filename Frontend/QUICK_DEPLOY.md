# 🚀 Quick Deploy Guide - 3 Steps Only!

## Step 1: Push to GitHub
```bash
git add .
git commit -m "Fix: Add secure NewsAPI proxy via Vercel serverless function"
git push origin main
```

## Step 2: Set Environment Variable in Vercel
1. Go to https://vercel.com/dashboard
2. Click your project → **Settings** → **Environment Variables**
3. Add:
   - **Name**: `NEWS_API_KEY`
   - **Value**: Your NewsAPI key from https://newsapi.org/account
   - **Environments**: Check all boxes (Production, Preview, Development)
4. Click **Save**

## Step 3: Deploy
Vercel auto-deploys from GitHub. Done! ✅

---

## Test It Works
Visit your Vercel URL and check:
- ✅ News articles load
- ✅ No "426 Upgrade Required" error
- ✅ Different categories work

---

## Where is my NewsAPI Key?
Get it from: https://newsapi.org/account

Still having issues? See `VERCEL_DEPLOYMENT_FIX.md` for detailed troubleshooting.
