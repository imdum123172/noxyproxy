import { useState, useEffect } from 'react'

export default function Game2048() {
  const [board, setBoard] = useState<number[][]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newBoard = Array(4).fill(0).map(() => Array(4).fill(0))
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
  }

  const addNewTile = (grid: number[][]) => {
    const empty: [number, number][] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) empty.push([i, j])
      }
    }
    if (empty.length > 0) {
      const [i, j] = empty[Math.floor(Math.random() * empty.length)]
      grid[i][j] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const move = (direction: string) => {
    let newBoard = board.map(row => [...row])
    let moved = false
    let newScore = score

    if (direction === 'left' || direction === 'right') {
      newBoard = newBoard.map(row => {
        const filtered = row.filter(v => v !== 0)
        const merged: number[] = []
        for (let i = 0; i < filtered.length; i++) {
          if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2)
            newScore += filtered[i] * 2
            i++
          } else {
            merged.push(filtered[i])
          }
        }
        return direction === 'right'
          ? [...Array(4 - merged.length).fill(0), ...merged]
          : [...merged, ...Array(4 - merged.length).fill(0)]
      })
    } else {
      for (let col = 0; col < 4; col++) {
        const column = [board[0][col], board[1][col], board[2][col], board[3][col]]
        const filtered = column.filter(v => v !== 0)
        const merged: number[] = []
        for (let i = 0; i < filtered.length; i++) {
          if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2)
            newScore += filtered[i] * 2
            i++
          } else {
            merged.push(filtered[i])
          }
        }
        const result = direction === 'down'
          ? [...Array(4 - merged.length).fill(0), ...merged]
          : [...merged, ...Array(4 - merged.length).fill(0)]
        for (let row = 0; row < 4; row++) {
          newBoard[row][col] = result[row]
        }
      }
    }

    moved = JSON.stringify(newBoard) !== JSON.stringify(board)
    if (moved) {
      addNewTile(newBoard)
      setBoard(newBoard)
      setScore(newScore)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const dirMap: Record<string, string> = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right'
        }
        move(dirMap[e.key])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [board, score])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🧩 2048</h2>
      
      <div className="inline-block mb-6">
        <div className="bg-gray-300 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-4 gap-2">
            {board.map((row, i) => row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 flex items-center justify-center rounded font-bold text-white text-xl transition-all ${
                  !cell ? 'bg-gray-400' :
                  cell === 2 ? 'bg-blue-400' :
                  cell === 4 ? 'bg-blue-500' :
                  cell === 8 ? 'bg-blue-600' :
                  cell === 16 ? 'bg-purple-500' :
                  cell === 32 ? 'bg-purple-600' :
                  cell === 64 ? 'bg-pink-500' :
                  cell === 128 ? 'bg-pink-600' :
                  cell === 256 ? 'bg-yellow-500' :
                  cell === 512 ? 'bg-yellow-600' :
                  cell === 1024 ? 'bg-red-500' :
                  'bg-red-600'
                }`}
              >
                {cell || ''}
              </div>
            )))}
          </div>
        </div>

        <div className="text-white mb-6">
          <p className="text-sm text-white/60">Score</p>
          <p className="text-3xl font-bold">{score}</p>
        </div>

        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
        >
          New Game
        </button>
      </div>

      <p className="text-white/60 text-sm">Use arrow keys to move tiles. Combine tiles to reach 2048!</p>
    </div>
  )
}
