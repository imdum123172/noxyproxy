import { useState } from 'react'

export default function ConnectFour() {
  const [board, setBoard] = useState<(string | null)[][]>(Array(6).fill(null).map(() => Array(7).fill(null)))
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  const checkWinner = (grid: (string | null)[][]): string | null => {
    // Check horizontal
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] && grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2] && grid[i][j] === grid[i][j + 3]) {
          return grid[i][j]
        }
      }
    }

    // Check vertical
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (grid[i][j] && grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j] && grid[i][j] === grid[i + 3][j]) {
          return grid[i][j]
        }
      }
    }

    // Check diagonal
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] && grid[i][j] === grid[i + 1][j + 1] && grid[i][j] === grid[i + 2][j + 2] && grid[i][j] === grid[i + 3][j + 3]) {
          return grid[i][j]
        }
      }
    }

    return null
  }

  const dropPiece = (col: number) => {
    if (gameOver || !isPlayerTurn) return

    const newBoard = board.map((r) => [...r])
    for (let i = 5; i >= 0; i--) {
      if (newBoard[i][col] === null) {
        newBoard[i][col] = 'R'
        break
      }
    }

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
      setGameOver(true)
    }

    setBoard(newBoard)
    setIsPlayerTurn(false)

    // AI move
    setTimeout(() => {
      const col = Math.floor(Math.random() * 7)
      const aiBoard = newBoard.map((r) => [...r])
      for (let i = 5; i >= 0; i--) {
        if (aiBoard[i][col] === null) {
          aiBoard[i][col] = 'Y'
          break
        }
      }
      const aiResult = checkWinner(aiBoard)
      if (aiResult) {
        setWinner(aiResult)
        setGameOver(true)
      }
      setBoard(aiBoard)
      setIsPlayerTurn(true)
    }, 500)
  }

  const resetGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)))
    setGameOver(false)
    setWinner(null)
    setIsPlayerTurn(true)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🔴 Connect Four</h2>

      <div className="inline-block mb-6">
        <div className="bg-blue-700 rounded-lg p-4 mb-4">
          <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {board.map((row, i) => row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => dropPiece(j)}
                className={`w-10 h-10 rounded-full ${
                  cell === 'R'
                    ? 'bg-red-500'
                    : cell === 'Y'
                    ? 'bg-yellow-400'
                    : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                }`}
              />
            )))}
          </div>

          <div className="flex gap-2 justify-center">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  onClick={() => dropPiece(i)}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  ↓
                </button>
              ))}
          </div>
        </div>

        <div className="text-white mb-6">
          {winner && (
            <p className="text-lg font-bold mb-2">
              {winner === 'R' ? '🎉 You Won!' : '🤖 AI Won!'}
            </p>
          )}
          {!gameOver && <p className="text-sm">{isPlayerTurn ? 'Your turn' : 'AI thinking...'}</p>}
        </div>

        <button
          onClick={resetGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
        >
          New Game
        </button>
      </div>
    </div>
  )
}
