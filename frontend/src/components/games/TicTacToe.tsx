import { useState } from 'react'

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [score, setScore] = useState({ X: 0, O: 0 })

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(board)

  const handleClick = (index: number) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setScore((prev) => ({
        ...prev,
        [gameWinner]: prev[gameWinner as 'X' | 'O'] + 1
      }))
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">⭕ Tic Tac Toe</h2>
      
      <div className="bg-white/5 rounded-lg p-6 inline-block mb-6">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-20 h-20 bg-purple-600 text-white text-3xl font-bold rounded-lg hover:bg-purple-700 transition-all"
            >
              {value}
            </button>
          ))}
        </div>

        <p className="text-white font-bold mb-4">
          {winner ? `🎉 Player ${winner} Wins!` : `Current: ${isXNext ? 'X' : 'O'}`}
        </p>

        <button
          onClick={resetGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
        >
          New Game
        </button>
      </div>

      <div className="flex gap-6 justify-center text-white">
        <div>
          <p className="text-sm text-white/60">Player X</p>
          <p className="text-2xl font-bold">{score.X}</p>
        </div>
        <div>
          <p className="text-sm text-white/60">Player O</p>
          <p className="text-2xl font-bold">{score.O}</p>
        </div>
      </div>
    </div>
  )
}
