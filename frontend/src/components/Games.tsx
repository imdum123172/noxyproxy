import { useState, useEffect } from 'react'
import axios from 'axios'
import FlappyBird from './games/FlappyBird'
import SnakeGame from './games/SnakeGame'
import TicTacToe from './games/TicTacToe'
import Game2048 from './games/Game2048'
import Minesweeper from './games/Minesweeper'
import PacMan from './games/Pac_Man'
import SpaceInvaders from './games/SpaceInvaders'
import Hangman from './games/Hangman'
import Sudoku from './games/Sudoku'
import Memory from './games/Memory'
import Pong from './games/Pong'
import ConnectFour from './games/ConnectFour'

export default function Games() {
  const [games, setGames] = useState<any[]>([])
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games')
        setGames(response.data)
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  const renderGame = (gameName: string) => {
    switch (gameName) {
      case 'Flappy Bird':
        return <FlappyBird />
      case 'Snake Game':
        return <SnakeGame />
      case 'Tic Tac Toe':
        return <TicTacToe />
      case '2048':
        return <Game2048 />
      case 'Minesweeper':
        return <Minesweeper />
      case 'Pac-Man':
        return <PacMan />
      case 'Space Invaders':
        return <SpaceInvaders />
      case 'Hangman':
        return <Hangman />
      case 'Sudoku':
        return <Sudoku />
      case 'Memory Match':
        return <Memory />
      case 'Pong':
        return <Pong />
      case 'Connect Four':
        return <ConnectFour />
      default:
        return <div className="text-white">Game not implemented yet</div>
    }
  }

  if (selectedGame) {
    return (
      <section className="pt-32 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
          >
            ← Back to Games
          </button>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            {renderGame(selectedGame)}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-32 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">🎮 Play Games</h2>
        
        {loading ? (
          <div className="text-white text-center">Loading games...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game.name)}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer transform hover:scale-105"
              >
                <h3 className="text-white font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-white/60 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50 bg-white/10 px-3 py-1 rounded">
                    {game.category}
                  </span>
                  <span className="text-lg">▶️</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
