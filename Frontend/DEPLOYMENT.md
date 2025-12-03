# News Aggregator - Deployment Guide

## ✅ Pre-Deployment Checklist

Your frontend is now ready for Vercel deployment with these improvements:
- ✅ SPA routing configured (vercel.json)
- ✅ Environment variables setup
- ✅ Responsive design
- ✅ No build errors
- ✅ PropTypes validation
- ✅ Accessibility features

## 🚀 Deploying to Vercel

### Step 1: Environment Variables Setup

Before deploying, you need to configure environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
VITE_NEWS_API_KEY=acd7637a0d124001b1e33db7424fe053
VITE_API_BASE_URL=https://your-backend-url.com/api
```

**Important:** Replace `https://your-backend-url.com/api` with your actual deployed backend URL.

### Step 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Navigate to Frontend directory
cd Frontend

# Deploy
vercel
```

### Step 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Set **Root Directory** to `Frontend`
5. Framework Preset: **Vite**
6. Add environment variables (see Step 1)
7. Click **Deploy**

## ⚠️ Important Notes

### Backend URL Configuration

Your Login/Signup features use backend API. Make sure to:

1. **Deploy your backend first** (to Railway, Render, Heroku, etc.)
2. **Update VITE_API_BASE_URL** in Vercel environment variables with the deployed backend URL
3. **Enable CORS** on your backend to allow requests from your Vercel domain

Example backend CORS configuration (Spring Boot):
```java
@CrossOrigin(origins = "https://your-vercel-app.vercel.app")
```

### NewsAPI Key

- The current API key is exposed in the code
- Consider getting a new key for production
- NewsAPI free tier has limitations (500 requests/day)
- For production, consider using a backend proxy to hide the API key

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env file (already created)
# Edit .env and update values if needed

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_NEWS_API_KEY` | Your NewsAPI key | `acd7637a0d124001b1e33db7424fe053` |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:2025/api` (dev)<br>`https://your-backend.com/api` (prod) |

## 🎯 Post-Deployment

After deploying:

1. Test all routes (home, categories)
2. Test Login/Signup (ensure backend is accessible)
3. Check browser console for any errors
4. Test on mobile devices
5. Verify dark mode toggle works

## 🐛 Troubleshooting

### Issue: 404 on Page Refresh
- **Solution:** vercel.json is configured to handle this

### Issue: Login/Signup not working
- **Solution:** Check VITE_API_BASE_URL is set correctly in Vercel
- **Solution:** Ensure backend CORS allows your Vercel domain

### Issue: News not loading
- **Solution:** Verify VITE_NEWS_API_KEY is set in Vercel
- **Solution:** Check NewsAPI rate limits

## 📞 Support

If you encounter issues, check:
- Vercel deployment logs
- Browser console errors
- Network tab in DevTools
