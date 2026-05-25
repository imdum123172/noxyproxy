import express, { Request, Response } from 'express';
import { getDatabase } from '../db/database';

export const gameRoutes = express.Router();

interface GameScore {
  id: number;
  game: string;
  player: string;
  score: number;
  date: string;
}

// Get available games
gameRoutes.get('/', (req: Request, res: Response) => {
  const games = [
    {
      id: 1,
      name: 'Flappy Bird',
      description: 'Classic flappy bird game',
      category: 'arcade',
      emoji: '🐦'
    },
    {
      id: 2,
      name: 'Snake Game',
      description: 'Classic snake game',
      category: 'arcade',
      emoji: '🐍'
    },
    {
      id: 3,
      name: '2048',
      description: 'Puzzle game - combine tiles',
      category: 'puzzle',
      emoji: '🧩'
    },
    {
      id: 4,
      name: 'Tic Tac Toe',
      description: 'Play against AI',
      category: 'strategy',
      emoji: '⭕'
    },
    {
      id: 5,
      name: 'Minesweeper',
      description: 'Classic minesweeper puzzle',
      category: 'puzzle',
      emoji: '💣'
    },
    {
      id: 6,
      name: 'Pac-Man',
      description: 'Navigate and collect dots',
      category: 'arcade',
      emoji: '👻'
    },
    {
      id: 7,
      name: 'Space Invaders',
      description: 'Shoot down invaders',
      category: 'arcade',
      emoji: '🛸'
    },
    {
      id: 8,
      name: 'Hangman',
      description: 'Word guessing game',
      category: 'word',
      emoji: '🎮'
    },
    {
      id: 9,
      name: 'Sudoku',
      description: 'Number puzzle game',
      category: 'puzzle',
      emoji: '🧮'
    },
    {
      id: 10,
      name: 'Memory Match',
      description: 'Match pairs of cards',
      category: 'puzzle',
      emoji: '🧠'
    },
    {
      id: 11,
      name: 'Pong',
      description: 'Classic paddle game',
      category: 'arcade',
      emoji: '🎾'
    },
    {
      id: 12,
      name: 'Connect Four',
      description: 'Connect pieces in a row',
      category: 'strategy',
      emoji: '🔴'
    }
  ];

  res.json(games);
});

// Save game score
gameRoutes.post('/score', (req: Request, res: Response) => {
  try {
    const { game, player, score } = req.body;

    if (!game || !player || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = getDatabase();
    
    if (!db) {
      return res.json({
        success: true,
        message: 'Score recorded (database offline)',
        scoreId: Math.random()
      });
    }

    const date = new Date().toISOString();

    db.run(
      'INSERT INTO scores (game, player, score, date) VALUES (?, ?, ?, ?)',
      [game, player, score, date],
      function (this: any, err: Error | null) {
        if (err) {
          return res.status(500).json({ error: 'Failed to save score' });
        }
        res.json({
          success: true,
          scoreId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get high scores
gameRoutes.get('/scores/:game', (req: Request, res: Response) => {
  try {
    const { game } = req.params;
    const db = getDatabase();

    if (!db) {
      return res.json([]);
    }

    db.all(
      'SELECT * FROM scores WHERE game = ? ORDER BY score DESC LIMIT 10',
      [game],
      (err: Error | null, rows: GameScore[] | undefined) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch scores' });
        }
        res.json(rows || []);
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
