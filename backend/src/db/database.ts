import sqlite3 from 'sqlite3';
import path from 'path';

let db: sqlite3.Database | null = null;

export function initDatabase() {
  try {
    const dbPath = path.join(__dirname, '../../data/noxyproxy.db');

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('✅ Connected to SQLite database');
        createTables();
      }
    });
  } catch (error) {
    console.warn('⚠️  SQLite3 not available, running without persistent storage');
    console.warn('Install build tools to enable database: apt-get install python3 build-essential');
  }
}

function createTables() {
  if (!db) return;

  db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game TEXT NOT NULL,
      player TEXT NOT NULL,
      score INTEGER NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS search_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function getDatabase(): sqlite3.Database | null {
  return db;
}
