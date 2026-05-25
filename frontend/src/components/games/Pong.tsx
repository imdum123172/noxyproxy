import { useState, useEffect } from 'react'

export default function Pong() {
  const [ballPos, setBallPos] = useState({ x: 50, y: 25 })
  const [ballVel, setBallVel] = useState({ x: 2, y: 2 })
  const [player1, setPlayer1] = useState(40)
  const [player2, setPlayer2] = useState(40)
  const [score, setScore] = useState({ p1: 0, p2: 0 })
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'w') setPlayer1((p) => Math.max(0, p - 5))
      if (e.key === 's') setPlayer1((p) => Math.min(80, p + 5))
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = setInterval(() => {
      if (!gameActive) return

      setBallPos((prev) => {
        let newX = prev.x + ballVel.x
        let newY = prev.y + ballVel.y
        let newVelX = ballVel.x
        let newVelY = ballVel.y

        if (newY <= 0 || newY >= 95) {
          newVelY = -newVelY
        }

        if (newX <= 5 && newY >= player1 && newY <= player1 + 20) {
          newVelX = -newVelX
        }

        if (newX >= 93 && newY >= player2 && newY <= player2 + 20) {
          newVelX = -newVelX
        }

        if (newX < 0) {
          setScore((s) => ({ ...s, p2: s.p2 + 1 }))
          newX = 50
          newY = 50
        }

        if (newX > 100) {
          setScore((s) => ({ ...s, p1: s.p1 + 1 }))
          newX = 50
          newY = 50
        }

        setBallVel({ x: newVelX, y: newVelY })
        return { x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) }
      })

      setPlayer2((p) => {
        const target = ballPos.y - 10
        if (target < p) return Math.max(0, p - 3)
        if (target > p) return Math.min(80, p + 3)
        return p
      })
    }, 50)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameActive, ballVel])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🎾 Pong</h2>

      <div className="relative w-96 h-48 bg-black border-4 border-white rounded-lg mb-6 mx-auto overflow-hidden">
        {/* Ball */}
        <div
          className="absolute w-3 h-3 bg-white rounded-full"
          style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
        />

        {/* Player 1 Paddle */}
        <div
          className="absolute w-2 h-20 bg-blue-400"
          style={{ left: '2%', top: `${player1}%` }}
        />

        {/* Player 2 Paddle */}
        <div
          className="absolute w-2 h-20 bg-red-400"
          style={{ right: '2%', top: `${player2}%` }}
        />

        {/* Center Line */}
        <div className="absolute left-1/2 h-full w-0.5 bg-white/30 transform -translate-x-1/2" />
      </div>

      <div className="text-white mb-6 flex justify-between items-center px-32">
        <div>
          <p className="text-sm text-white/60">Player 1</p>
          <p className="text-3xl font-bold">{score.p1}</p>
        </div>
        <div className="text-4xl font-bold">:</div>
        <div>
          <p className="text-sm text-white/60">AI</p>
          <p className="text-3xl font-bold">{score.p2}</p>
        </div>
      </div>

      <button
        onClick={() => {
          setScore({ p1: 0, p2: 0 })
          setBallPos({ x: 50, y: 25 })
        }}
        className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
      >
        Reset
      </button>

      <p className="text-white/60 text-sm mt-4">Use W and S to move your paddle</p>
    </div>
  )
}
