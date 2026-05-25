import { useState, useEffect } from 'react'

export default function SpaceInvaders() {
  const [playerPos, setPlayerPos] = useState(5)
  const [bullets, setBullets] = useState<number[]>([])
  const [enemies, setEnemies] = useState([0, 1, 2, 3, 4])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPlayerPos((p) => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setPlayerPos((p) => Math.min(9, p + 1))
      if (e.key === ' ') {
        e.preventDefault()
        setBullets((b) => [...b, playerPos])
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = setInterval(() => {
      if (!gameActive) return

      setBullets((b) => {
        const updated = b
          .map((bullet) => bullet - 1)
          .filter((bullet) => bullet >= 0)

        const hit = updated.some((bullet) => enemies.includes(Math.floor(Math.random() * 10)))
        if (hit) {
          setScore((s) => s + 100)
          setEnemies((e) => e.filter((_, i) => i !== 0))
        }

        return updated
      })

      setEnemies((e) => {
        if (e.length === 0) {
          setEnemies([0, 1, 2, 3, 4])
          return [0, 1, 2, 3, 4]
        }
        return e
      })
    }, 100)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameActive, enemies])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🛸 Space Invaders</h2>

      <div className="bg-black rounded-lg p-4 inline-block mb-6">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
          {Array(100)
            .fill(0)
            .map((_, i) => {
              const x = i % 10
              const y = Math.floor(i / 10)
              const isPlayer = x === playerPos && y === 9
              const isEnemy = enemies.some((e) => Math.floor(Math.random() * 10) === x && y < 3)
              const isBullet = bullets.includes(x) && y === 8

              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    isPlayer
                      ? 'bg-green-400 text-lg'
                      : isEnemy
                      ? 'bg-red-500 text-lg'
                      : isBullet
                      ? 'bg-yellow-300'
                      : 'bg-gray-900'
                  }`}
                >
                  {isPlayer ? '△' : isEnemy ? '👾' : isBullet ? '•' : ''}
                </div>
              )
            })}
        </div>
      </div>

      <div className="text-white mb-6">
        <p className="text-sm text-white/60">Score</p>
        <p className="text-3xl font-bold">{score}</p>
      </div>

      <p className="text-white/60 text-sm">← → to move, SPACE to shoot</p>
    </div>
  )
}
