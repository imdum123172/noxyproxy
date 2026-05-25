import { useState, useEffect } from 'react'

const WORDS = [
  'JAVASCRIPT', 'PROGRAMMING', 'COMPUTER', 'INTERNET', 'KEYBOARD',
  'MONITOR', 'BROWSER', 'WEBSITE', 'DATABASE', 'SECURITY',
  'NETWORK', 'ALGORITHM', 'FUNCTION', 'VARIABLE', 'DEVELOPER'
]

export default function Hangman() {
  const [word, setWord] = useState('')
  const [guessed, setGuessed] = useState<string[]>([])
  const [wrong, setWrong] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setWord(newWord)
    setGuessed([])
    setWrong(0)
    setGameOver(false)
    setWon(false)
  }, [])

  const handleGuess = (letter: string) => {
    if (guessed.includes(letter) || gameOver || won) return

    const newGuessed = [...guessed, letter]
    setGuessed(newGuessed)

    if (!word.includes(letter)) {
      const newWrong = wrong + 1
      setWrong(newWrong)
      if (newWrong >= 6) {
        setGameOver(true)
      }
    }

    const wordLetters = word.split('')
    const allGuessed = wordLetters.every((l) => newGuessed.includes(l))
    if (allGuessed) {
      setWon(true)
    }
  }

  const resetGame = () => {
    const newWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setWord(newWord)
    setGuessed([])
    setWrong(0)
    setGameOver(false)
    setWon(false)
  }

  const hangmanStages = [
    '  ------\n  |    |\n  |\n  |\n  |\n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |\n  |\n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |    |\n  |\n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |   \\|\n  |\n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |   \\|/\n  |\n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |   \\|/\n  |   / \n  |\n  ------',
    '  ------\n  |    |\n  |    O\n  |   \\|/\n  |   / \\\n  |\n  ------'
  ]

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🎮 Hangman</h2>

      <div className="bg-white/10 rounded-lg p-6 inline-block mb-6">
        <pre className="text-yellow-300 font-mono text-sm mb-6">{hangmanStages[wrong]}</pre>

        <p className="text-white text-2xl font-bold mb-6 tracking-widest">
          {word.split('').map((l) => (guessed.includes(l) ? l : '_')).join(' ')}
        </p>

        <div className="grid grid-cols-7 gap-2 mb-6 max-w-xs">
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessed.includes(letter) || gameOver || won}
              className={`w-8 h-8 rounded text-sm font-bold ${
                guessed.includes(letter)
                  ? 'bg-gray-500 text-white opacity-50'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="text-white mb-6">
          <p className="text-sm text-white/60">Wrong Guesses: {wrong}/6</p>
          {won && <p className="text-lg font-bold text-green-400">🎉 You Won!</p>}
          {gameOver && <p className="text-lg font-bold text-red-400">Game Over! Word: {word}</p>}
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
