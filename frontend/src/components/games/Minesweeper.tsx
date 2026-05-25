import { useState, useEffect } from 'react'

interface Cell {
  revealed: boolean
  flagged: boolean
  mine: boolean
  adjacent: number
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [mineCount, setMineCount] = useState(10)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newBoard: Cell[][] = Array(8).fill(0).map(() =>
      Array(8).fill(0).map(() => ({
        revealed: false,
        flagged: false,
        mine: false,
        adjacent: 0
      }))
    )

    let minesPlaced = 0
    while (minesPlaced < 10) {
      const row = Math.floor(Math.random() * 8)
      const col = Math.floor(Math.random() * 8)
      if (!newBoard[row][col].mine) {
        newBoard[row][col].mine = true
        minesPlaced++
      }
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!newBoard[i][j].mine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di, nj = j + dj
              if (ni >= 0 && ni < 8 && nj >= 0 && nj < 8 && newBoard[ni][nj].mine) {
                count++
              }
            }
          }
          newBoard[i][j].adjacent = count
        }
      }
    }

    setBoard(newBoard)
    setGameOver(false)
    setGameWon(false)
  }

  const revealCell = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].revealed) return

    const newBoard = board.map(r => [...r])
    if (newBoard[row][col].mine) {
      newBoard.forEach(r => r.forEach(c => {
        if (c.mine) c.revealed = true
      }))
      setBoard(newBoard)
      setGameOver(true)
      return
    }

    const flood = (r: number, c: number) => {
      if (r < 0 || r >= 8 || c < 0 || c >= 8 || newBoard[r][c].revealed) return
      newBoard[r][c].revealed = true
      if (newBoard[r][c].adjacent === 0) {
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            flood(r + di, c + dj)
          }
        }
      }
    }

    flood(row, col)
    setBoard(newBoard)

    const allNonMinesRevealed = newBoard.every((r, i) =>
      r.every((c, j) => !c.mine || !c.revealed)
    )
    if (allNonMinesRevealed) {
      setGameWon(true)
    }
  }

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (board[row][col].revealed) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col].flagged = !newBoard[row][col].flagged
    setBoard(newBoard)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">💣 Minesweeper</h2>
      
      <div className="inline-block mb-6">
        <div className="bg-gray-300 rounded-lg p-3 mb-4 inline-block">
          <div className="grid gap-0" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            {board.map((row, i) => row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => revealCell(i, j)}
                onContextMenu={(e) => toggleFlag(i, j, e)}
                className={`w-8 h-8 text-xs font-bold flex items-center justify-center border ${
                  cell.revealed
                    ? cell.mine
                      ? 'bg-red-500 text-white'
                      : cell.adjacent === 0
                      ? 'bg-gray-100'
                      : `bg-gray-100 text-blue-600`
                    : 'bg-gray-400 hover:bg-gray-350 cursor-pointer'
                }`}
              >
                {cell.flagged && !cell.revealed ? '🚩' : cell.revealed && cell.adjacent > 0 ? cell.adjacent : ''}
              </button>
            )))}
          </div>
        </div>

        <div className="text-white mb-6">
          {gameWon && <p className="text-lg font-bold text-green-400 mb-2">🎉 You Won!</p>}
          {gameOver && <p className="text-lg font-bold text-red-400 mb-2">💣 Game Over!</p>}
          <p className="text-sm text-white/60">Flags: {board.flat().filter(c => c.flagged).length}/{mineCount}</p>
        </div>

        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
        >
          New Game
        </button>
      </div>

      <p className="text-white/60 text-sm">Left click to reveal, Right click to flag</p>
    </div>
  )
}
