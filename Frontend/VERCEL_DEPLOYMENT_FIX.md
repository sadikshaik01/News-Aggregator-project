# 🚀 Vercel Deployment Guide - NewsAPI Fix

## Problem Fixed
Previously, the app was calling NewsAPI directly from the browser, which caused a **426 Upgrade Required** error because NewsAPI doesn't allow client-side requests on their free tier.

## Solution Implemented
Created a **Vercel Serverless Function** that acts as a secure proxy between your frontend and NewsAPI.

---

## 📁 Files Changed

### 1. **`/api/news.js`** (NEW)
- Serverless function that runs on Vercel's backend
- Securely stores and uses your NewsAPI key
- Handles all requests to NewsAPI
- Returns data to your frontend

### 2. **`/src/Components/NewsBoard.jsx`** (UPDATED)
- Now calls `/api/news` instead of NewsAPI directly
- Removed hardcoded API key from frontend
- Added better error handling and logging
- Uses async/await for cleaner code

---

## 🔧 Deployment Steps

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Fix: Add serverless function for NewsAPI proxy"
git push origin main
```

### Step 2: Configure Environment Variable in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your **News-Aggregator-project**
3. Click on **Settings** tab
4. Navigate to **Environment Variables** section
5. Add a new environment variable:
   - **Key**: `NEWS_API_KEY`
   - **Value**: Your NewsAPI key (get it from https://newsapi.org/account)
   - **Environments**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy

After adding the environment variable, Vercel will automatically redeploy. If not:
1. Go to **Deployments** tab
2. Click on the three dots (...) next to your latest deployment
3. Click **Redeploy**

---

## 🧪 Testing Locally

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Create `.env.local` file in Frontend directory
```env
NEWS_API_KEY=your_newsapi_key_here
```

### 3. Run Vercel Dev Server
```bash
cd Frontend
vercel dev
```

This will run your app with serverless functions at `http://localhost:3000`

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] No API key is visible in browser DevTools > Network tab
- [ ] `/api/news?country=us&category=general` returns JSON data
- [ ] News articles load without "426 Upgrade Required" error
- [ ] Different categories work (business, sports, technology, etc.)
- [ ] Error messages are user-friendly

---

## 🔍 Troubleshooting

### Issue: Still getting "Failed to fetch news"
**Solution**: 
- Check Vercel logs: Dashboard > Your Project > Deployments > [Latest] > Function Logs
- Verify `NEWS_API_KEY` is set correctly in Environment Variables
- Ensure you've redeployed after adding the environment variable

### Issue: API returns "apiKeyMissing" error
**Solution**:
- The environment variable isn't set in Vercel
- Go to Settings > Environment Variables and add `NEWS_API_KEY`

### Issue: CORS errors
**Solution**:
- The `/api/news.js` function already includes CORS headers
- Make sure you're accessing the app through the correct Vercel domain

### Issue: Works locally but not on Vercel
**Solution**:
- Local uses `.env.local`, Vercel uses Environment Variables
- Ensure `NEWS_API_KEY` is set in Vercel Dashboard
- Check that `/api/news.js` is in the correct location (inside Frontend folder)

---

## 📊 API Usage

### Endpoint
```
GET /api/news
```

### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | 'us' | Country code (e.g., 'us', 'gb', 'in') |
| category | string | 'general' | News category |
| pageSize | number | 20 | Number of articles (max: 100) |
| page | number | 1 | Page number for pagination |
| q | string | - | Search query (optional) |

### Valid Categories
- `business`
- `entertainment`
- `general`
- `health`
- `science`
- `sports`
- `technology`

### Example Requests
```javascript
// Default - US general news
fetch('/api/news?country=us&category=general')

// Technology news
fetch('/api/news?country=us&category=technology')

// Search for specific topic
fetch('/api/news?country=us&category=general&q=bitcoin')

// Pagination
fetch('/api/news?country=us&category=sports&page=2&pageSize=10')
```

---

## 🔒 Security Notes

✅ **What's Secure:**
- API key is stored server-side only
- No sensitive data exposed to browser
- CORS properly configured
- Input validation on query parameters

⚠️ **Additional Recommendations:**
- Consider adding rate limiting to prevent abuse
- Add authentication if you want to track users
- Monitor Vercel function invocations to stay within limits

---

## 📝 Vercel Configuration

Your `vercel.json` should look like this (if it exists):
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

If you don't have this file, Vercel will automatically handle it.

---

## 💰 Cost Considerations

### Vercel Free Tier Limits:
- 100 GB bandwidth/month
- 100 hours serverless function execution/month
- 6,000 minutes build time/month

### NewsAPI Free Tier Limits:
- 100 requests per day
- No commercial use
- Attribution required

**Tip**: If you need more requests, consider caching responses or upgrading to NewsAPI's paid plan.

---

## 🎯 Next Steps

1. ✅ Deploy the code to Vercel
2. ✅ Add `NEWS_API_KEY` environment variable
3. ✅ Test the deployed app
4. 📈 Consider adding:
   - Response caching to reduce API calls
   - Pagination for browsing more articles
   - Favorite/bookmark functionality
   - Share functionality

---

## 📚 Additional Resources

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions/serverless-functions)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

**Status**: ✅ Ready for Deployment

If you encounter any issues, check Vercel's function logs for detailed error messages.
