import { useState, useEffect } from 'react'

export default function SnakeGame() {
  const [gameActive, setGameActive] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setScore((prev) => prev + 10)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🐍 Snake Game</h2>
      
      <div className="bg-green-900 rounded-lg h-96 w-full mb-4 flex items-center justify-center">
        <div className="grid grid-cols-10 gap-1 p-4">
          {Array(100).fill(0).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-green-800 rounded"></div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-white">
          <p className="text-sm text-white/60">Score</p>
          <p className="text-3xl font-bold">{score}</p>
        </div>
        
        <button
          onClick={() => {
            setScore(0)
            setGameActive(true)
          }}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-all"
        >
          Restart
        </button>
      </div>

      <p className="text-white/60 text-sm">Use arrow keys to control the snake!</p>
    </div>
  )
}
