import { useState, useEffect } from 'react'

export default function PacMan() {
  const [pacPos, setPacPos] = useState({ x: 5, y: 5 })
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [direction, setDirection] = useState('right')

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (['arrowup', 'w'].includes(key)) setDirection('up')
      if (['arrowdown', 's'].includes(key)) setDirection('down')
      if (['arrowleft', 'a'].includes(key)) setDirection('left')
      if (['arrowright', 'd'].includes(key)) setDirection('right')
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = setInterval(() => {
      if (!gameActive) return

      setPacPos((prev) => {
        let newX = prev.x
        let newY = prev.y

        if (direction === 'up') newY = Math.max(0, prev.y - 1)
        if (direction === 'down') newY = Math.min(9, prev.y + 1)
        if (direction === 'left') newX = Math.max(0, prev.x - 1)
        if (direction === 'right') newX = Math.min(9, prev.x + 1)

        setScore((s) => s + 10)
        return { x: newX, y: newY }
      })
    }, 200)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [direction, gameActive])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">👻 Pac-Man</h2>

      <div className="bg-black rounded-lg p-4 inline-block mb-6">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
          {Array(100)
            .fill(0)
            .map((_, i) => {
              const x = i % 10
              const y = Math.floor(i / 10)
              const isPac = pacPos.x === x && pacPos.y === y

              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    isPac
                      ? 'bg-yellow-400 text-lg'
                      : Math.random() > 0.9
                      ? 'bg-yellow-200 text-sm'
                      : 'bg-blue-900'
                  }`}
                >
                  {isPac ? '●' : Math.random() > 0.9 ? '●' : ''}
                </div>
              )
            })}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 text-white">
        <div>
          <p className="text-sm text-white/60">Score</p>
          <p className="text-3xl font-bold">{score}</p>
        </div>

        <button
          onClick={() => {
            setPacPos({ x: 5, y: 5 })
            setScore(0)
          }}
          className="px-6 py-3 bg-purple-500 rounded-lg font-bold hover:bg-purple-600"
        >
          Reset
        </button>
      </div>

      <p className="text-white/60 text-sm">Use arrow keys or WASD to move</p>
    </div>
  )
}
