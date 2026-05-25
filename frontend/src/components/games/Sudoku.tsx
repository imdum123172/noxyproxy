import { useState, useEffect } from 'react'

export default function Sudoku() {
  const [board, setBoard] = useState<(number | null)[][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)

  useEffect(() => {
    generatePuzzle()
  }, [])

  const generatePuzzle = () => {
    const empty = Array(81).fill(0).map(() => Array(9).fill(0))
    const newBoard: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null))

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newBoard[i][j] = Math.floor(Math.random() * 9) + 1
      }
    }

    for (let i = 0; i < 4; i++) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      newBoard[row][col] = null
    }

    setBoard(newBoard)
    setSelectedCell(null)
  }

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col])
  }

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return
    const [row, col] = selectedCell
    if (board[row][col] !== null) return

    const newBoard = board.map((r) => [...r])
    newBoard[row][col] = num
    setBoard(newBoard)
  }

  const handleClear = () => {
    if (!selectedCell) return
    const [row, col] = selectedCell
    const newBoard = board.map((r) => [...r])
    newBoard[row][col] = null
    setBoard(newBoard)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🧩 Sudoku</h2>

      <div className="inline-block mb-6">
        <div className="bg-white/10 rounded-lg p-4 inline-block">
          <div className="grid gap-0 mb-6" style={{ gridTemplateColumns: 'repeat(9, 1fr)', gap: '0' }}>
            {board.map((row, i) => row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-bold cursor-pointer ${
                  selectedCell?.[0] === i && selectedCell?.[1] === j
                    ? 'bg-purple-500 text-white'
                    : cell === null
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-blue-500/30 text-white'
                } border border-white/20`}
                style={{
                  borderRight: (j + 1) % 3 === 0 ? '2px solid white' : undefined,
                  borderBottom: (i + 1) % 3 === 0 ? '2px solid white' : undefined
                }}
              >
                {cell}
              </div>
            )))}
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 font-bold text-sm"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold text-sm col-span-4"
            >
              Clear
            </button>
          </div>

          <button
            onClick={generatePuzzle}
            className="w-full px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600"
          >
            New Game
          </button>
        </div>
      </div>

      <p className="text-white/60 text-sm">Click cells, enter numbers, and complete the 9x9 grid!</p>
    </div>
  )
}
