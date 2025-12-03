/**
 * Vercel Serverless Function for NewsAPI
 * 
 * This function acts as a proxy to fetch news from NewsAPI.org
 * while keeping the API key secure on the server side.
 * 
 * Environment Variables Required:
 * - NEWS_API_KEY: Your NewsAPI.org API key (set in Vercel Dashboard)
 * 
 * Query Parameters:
 * - country: Country code (default: 'us')
 * - category: News category (default: 'general')
 * - pageSize: Number of articles (default: 20, max: 100)
 * - page: Page number for pagination (default: 1)
 */

export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      message: 'Method not allowed. Use GET.' 
    });
  }

  // Check if API key is configured
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error('NEWS_API_KEY is not configured in environment variables');
    return res.status(500).json({ 
      status: 'error',
      message: 'Server configuration error. API key not found.' 
    });
  }

  // Extract and validate query parameters
  const {
    country = 'us',
    category = 'general',
    pageSize = '20',
    page = '1',
    q = '' // search query (optional)
  } = req.query;

  // Validate category
  const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
    });
  }

  // Validate pageSize
  const pageSizeNum = parseInt(pageSize, 10);
  if (isNaN(pageSizeNum) || pageSizeNum < 1 || pageSizeNum > 100) {
    return res.status(400).json({
      status: 'error',
      message: 'pageSize must be between 1 and 100'
    });
  }

  try {
    // Build NewsAPI URL
    const params = new URLSearchParams({
      country,
      category,
      pageSize: pageSizeNum.toString(),
      page,
    });

    // Add search query if provided
    if (q) {
      params.append('q', q);
    }

    const newsApiUrl = `https://newsapi.org/v2/top-headlines?${params.toString()}`;

    console.log(`Fetching news: category=${category}, country=${country}, page=${page}`);

    // Fetch from NewsAPI with server-side request
    const response = await fetch(newsApiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Parse the response
    const data = await response.json();

    // Check if NewsAPI returned an error
    if (!response.ok) {
      console.error('NewsAPI error:', response.status, data);
      return res.status(response.status).json({
        status: 'error',
        message: data.message || 'Failed to fetch news from NewsAPI',
        code: data.code || 'unknown'
      });
    }

    // Check if NewsAPI response has the expected structure
    if (data.status !== 'ok') {
      console.error('NewsAPI returned non-ok status:', data);
      return res.status(500).json({
        status: 'error',
        message: data.message || 'NewsAPI returned an error',
        code: data.code || 'unknown'
      });
    }

    // Return successful response
    console.log(`Successfully fetched ${data.articles?.length || 0} articles`);
    return res.status(200).json({
      status: 'ok',
      totalResults: data.totalResults || 0,
      articles: data.articles || []
    });

  } catch (error) {
    // Handle network or unexpected errors
    console.error('Error fetching news:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch news. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
