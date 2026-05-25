import express, { Request, Response } from 'express';

export const searchRoutes = express.Router();

// Search the web through proxy
searchRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Use DuckDuckGo as a privacy-friendly search option
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.json();

    res.json({
      query,
      results: data
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Search failed',
      details: error.message
    });
  }
});

// Get trending searches
searchRoutes.get('/trending', (req: Request, res: Response) => {
  const trending = [
    'How to unblock websites',
    'Free online games',
    'Learn programming',
    'YouTube alternatives',
    'News today'
  ];

  res.json({ trending });
});
