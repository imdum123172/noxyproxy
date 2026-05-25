import express, { Request, Response } from 'express';
import axios from 'axios';

export const proxyRoutes = express.Router();

// Proxy endpoint to unblock sites
proxyRoutes.post('/fetch', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Fetch the content through proxy
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    res.json({
      success: true,
      content: response.data,
      headers: response.headers
    });
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch content',
      details: error.message
    });
  }
});

// Get proxy status
proxyRoutes.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'active',
    message: 'Proxy service is running'
  });
});
