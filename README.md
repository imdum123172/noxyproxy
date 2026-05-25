# NoxyProxy 🚀

A modern web proxy service that allows you to unblock any website, search freely, and play games with a beautiful interface.

## Features

✨ **Unblock Any Site** - Access blocked websites through our fast proxy service
🔍 **Free Web Search** - Search the internet without restrictions
🎮 **Built-in Games** - Play Flappy Bird, Snake, Tic Tac Toe, and more
🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
⚡ **Fast & Reliable** - Optimized for speed and performance
🔒 **Privacy First** - Your data stays secure and anonymous

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite3
- CORS

## Project Structure

```
noxyproxy/
├── frontend/                 # React frontend app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
├── backend/                  # Node.js backend server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── db/              # Database setup
│   │   └── index.ts
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd noxyproxy
```

2. **Install dependencies**
```bash
npm install
```

This will install dependencies for both frontend and backend.

### Development

Start both frontend and backend with one command:

```bash
npm run dev
```

This will run:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Individual Development

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### Build for Production

```bash
npm run build
```

This builds both the backend and frontend.

## API Endpoints

### Proxy Routes
- `POST /api/proxy/fetch` - Fetch content from any URL
- `GET /api/proxy/status` - Check proxy status

### Games Routes
- `GET /api/games` - Get list of available games
- `POST /api/games/score` - Save game score
- `GET /api/games/scores/:game` - Get high scores for a game

### Search Routes
- `POST /api/search` - Search the web
- `GET /api/search/trending` - Get trending searches

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
```

## Games Included

🐦 **Flappy Bird** - Classic arcade game
🐍 **Snake** - Retro snake game
⭕ **Tic Tac Toe** - Strategy game against AI
🧩 **2048** - Combine tiles puzzle game
💣 **Minesweeper** - Classic logic puzzle
👻 **Pac-Man** - Navigate and collect dots
🛸 **Space Invaders** - Shoot down invaders
🎮 **Hangman** - Word guessing game
🧮 **Sudoku** - Number puzzle game
🧠 **Memory Match** - Card matching game
🎾 **Pong** - Classic paddle vs AI
🔴 **Connect Four** - Strategic game against AI

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Disclaimer

This project is for educational purposes. Users are responsible for complying with local laws and regulations when using proxy services.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for free internet access
