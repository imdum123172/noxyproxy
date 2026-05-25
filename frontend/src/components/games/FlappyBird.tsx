import { useState, useEffect, useRef } from 'react'

export default function FlappyBird() {
  const [birdY, setBirdY] = useState(250)
  const [gameActive, setGameActive] = useState(true)
  const [score, setScore] = useState(0)
  const gameLoopRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!gameActive) return

    const handleKeyPress = () => {
      setBirdY((prev) => Math.max(0, prev - 50))
    }

    window.addEventListener('keydown', handleKeyPress)

    gameLoopRef.current = setInterval(() => {
      setBirdY((prev) => {
        const newY = prev + 5
        if (newY > 500) {
          setGameActive(false)
        }
        return newY
      })
      setScore((prev) => prev + 1)
    }, 50)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameActive])

  const resetGame = () => {
    setBirdY(250)
    setScore(0)
    setGameActive(true)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🐦 Flappy Bird</h2>
      
      <div className="bg-blue-300 rounded-lg relative h-96 w-full mb-4 overflow-hidden">
        <div
          className="absolute w-8 h-8 bg-yellow-400 rounded-full transition-all"
          style={{ top: `${birdY}px`, left: '50px' }}
        >
          🐦
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-white">
          <p className="text-sm text-white/60">Score</p>
          <p className="text-3xl font-bold">{Math.floor(score / 10)}</p>
        </div>
        
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-all"
        >
          {gameActive ? 'Press SPACE' : 'Game Over - Restart'}
        </button>
      </div>

      <p className="text-white/60 text-sm">Press SPACE or click to make the bird fly up!</p>
    </div>
  )
}
