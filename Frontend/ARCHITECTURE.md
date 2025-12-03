# 🏗️ Architecture Overview - NewsAPI Proxy

## Before (❌ Not Working)
```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ Direct fetch() with API key exposed
       │ https://newsapi.org/v2/top-headlines?apiKey=xxxxx
       │
       ▼
┌─────────────┐
│   NewsAPI   │──── ❌ 426 Upgrade Required
│   Server    │     (Client-side calls blocked)
└─────────────┘
```

**Problems:**
- ❌ API key exposed in browser (security risk)
- ❌ NewsAPI blocks client-side requests (426 error)
- ❌ Users can steal your API key from DevTools

---

## After (✅ Working!)
```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ fetch('/api/news?category=tech')
       │ No API key in request
       │
       ▼
┌─────────────────────────────┐
│   Vercel Serverless Proxy   │
│   (/api/news.js)            │
│                             │
│  • Reads NEWS_API_KEY       │
│  • Validates params         │
│  • Makes server request     │
└──────────┬──────────────────┘
           │
           │ Server-to-server request
           │ https://newsapi.org/v2/top-headlines
           │ Header: X-Api-Key: YOUR_SECRET_KEY
           │
           ▼
    ┌─────────────┐
    │   NewsAPI   │──── ✅ 200 OK
    │   Server    │     Returns articles
    └──────┬──────┘
           │
           │ JSON response
           │
           ▼
    ┌─────────────────────────────┐
    │   Vercel Serverless Proxy   │
    │   Returns data to frontend  │
    └──────────┬──────────────────┘
               │
               │ Clean JSON response
               │
               ▼
        ┌─────────────┐
        │   Browser   │
        │   Displays  │
        │   Articles  │
        └─────────────┘
```

**Benefits:**
- ✅ API key stays secure on server
- ✅ Server-to-server calls are allowed
- ✅ Users can't access your API key
- ✅ Easy to add rate limiting, caching, analytics

---

## File Structure
```
Frontend/
├── api/
│   └── news.js ..................... Serverless function (runs on Vercel)
├── src/
│   └── Components/
│       └── NewsBoard.jsx ........... React component (runs in browser)
├── .env.local ...................... Local dev API key (gitignored)
└── vercel.json ..................... Vercel configuration
```

---

## Data Flow
```
User clicks "Technology" category
        ↓
NewsBoard.jsx calls: fetch('/api/news?category=technology')
        ↓
Vercel routes to: /api/news.js
        ↓
news.js reads: process.env.NEWS_API_KEY
        ↓
news.js calls: https://newsapi.org/v2/top-headlines
                with X-Api-Key header
        ↓
NewsAPI returns: { articles: [...] }
        ↓
news.js returns to browser: { status: "ok", articles: [...] }
        ↓
NewsBoard.jsx renders articles
        ↓
User sees news! 🎉
```

---

## Security Comparison

### ❌ Before (Client-Side):
```javascript
// In Browser - Anyone can see this!
const apiKey = "acd7637a0d124001b1e33db7424fe053"; // 😱 EXPOSED
fetch(`https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`)
```

### ✅ After (Server-Side):
```javascript
// In Browser - Safe!
fetch('/api/news?category=technology') // ✅ No API key

// In Vercel Function (server) - Hidden from users
const apiKey = process.env.NEWS_API_KEY; // ✅ SECURE
fetch(newsApiUrl, { headers: { 'X-Api-Key': apiKey } })
```

---

## Environment Variables Flow

### Local Development:
```
.env.local (your machine)
    ↓
process.env.NEWS_API_KEY
    ↓
Vercel Dev Server reads it
    ↓
/api/news.js uses it
```

### Production (Vercel):
```
Vercel Dashboard → Settings → Environment Variables
    ↓
NEWS_API_KEY = your_key_here
    ↓
Deployed /api/news.js reads it at runtime
    ↓
NewsAPI receives requests with valid key
```

---

## Request/Response Example

### User Request (Browser):
```http
GET /api/news?country=us&category=technology&pageSize=10
```

### Serverless Function Processes:
```javascript
1. Validate category (✓ "technology" is valid)
2. Validate pageSize (✓ 10 is between 1-100)
3. Build NewsAPI URL with params
4. Add secret API key from env var
5. Fetch from NewsAPI
6. Return response to browser
```

### Browser Receives:
```json
{
  "status": "ok",
  "totalResults": 38,
  "articles": [
    {
      "title": "AI Breakthrough...",
      "description": "...",
      "url": "https://...",
      "urlToImage": "https://...",
      "publishedAt": "2025-12-03T10:00:00Z"
    }
  ]
}
```

---

## Why Serverless?

### Traditional Server:
- ❌ Always running (costs money even when idle)
- ❌ Need to manage scaling
- ❌ Need to configure deployment

### Serverless Function:
- ✅ Only runs when called (pay per request)
- ✅ Auto-scales automatically
- ✅ Zero configuration deployment
- ✅ Perfect for API proxies

---

## Cost Breakdown

### Vercel Free Tier:
- 100 GB bandwidth/month
- 100 hours function execution/month
- Unlimited function invocations

### Example Usage:
- Each request takes ~200ms = 0.0000556 hours
- 100 hours = ~1,800,000 requests/month
- **You're safe with typical usage!**

### NewsAPI Free Tier:
- 100 requests/day
- 3,000 requests/month
- **This is your limiting factor**

**Tip**: Add caching to reduce NewsAPI calls:
```javascript
// Cache responses for 5 minutes
// 100 unique users × 10 requests = only 10 NewsAPI calls
```

---

## Next Steps

### Immediate:
1. ✅ Deploy to Vercel
2. ✅ Set NEWS_API_KEY environment variable
3. ✅ Test in production

### Future Enhancements:
1. **Add Caching**: Store responses in Redis/Upstash
2. **Add Rate Limiting**: Prevent abuse
3. **Add Analytics**: Track popular categories
4. **Add Search**: Use the `q` parameter
5. **Add Pagination**: Show more articles

---

## Debugging Tips

### Check Function Logs (Vercel):
```
Dashboard → Your Project → Deployments → [Latest] → Function Logs
```

### Test Locally:
```bash
vercel dev
# Then visit: http://localhost:3000/api/news?category=sports
```

### Test in Production:
```javascript
// In browser console
fetch('/api/news?country=us&category=general')
  .then(r => r.json())
  .then(console.log)
```

---

**🎉 Your app is now production-ready with secure API handling!**
