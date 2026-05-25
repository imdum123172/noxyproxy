import { useState, useEffect } from 'react'

export default function Memory() {
  const [cards, setCards] = useState<{ id: number; emoji: string; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matched, setMatched] = useState(0)

  const emojis = ['🍎', '🍌', '🍒', '🍉', '🍕', '🍔', '🍟', '🌭']

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const pairs = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const newCards = pairs.map((emoji, idx) => ({
      id: idx,
      emoji,
      matched: false
    }))
    setCards(newCards)
    setFlipped([])
    setMoves(0)
    setMatched(0)
  }

  const handleFlip = (id: number) => {
    if (flipped.includes(id) || flipped.length === 2) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)

      const [first, second] = newFlipped
      if (cards[first].emoji === cards[second].emoji) {
        const newCards = cards.map((card) =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        )
        setCards(newCards)
        setMatched((m) => m + 1)
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 500)
      }
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">🎮 Memory Match</h2>

      <div className="inline-block mb-6">
        <div className="grid grid-cols-4 gap-3 mb-6 bg-white/10 p-4 rounded-lg">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              disabled={card.matched}
              className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all ${
                card.matched
                  ? 'bg-green-500 text-white'
                  : flipped.includes(card.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {flipped.includes(card.id) || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        <div className="text-white mb-6 flex gap-8 justify-center">
          <div>
            <p className="text-sm text-white/60">Moves</p>
            <p className="text-2xl font-bold">{moves}</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Matched</p>
            <p className="text-2xl font-bold">{matched}/8</p>
          </div>
        </div>

        {matched === 8 && (
          <p className="text-lg font-bold text-green-400 mb-4">🎉 You Won in {moves} moves!</p>
        )}

        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600"
        >
          New Game
        </button>
      </div>
    </div>
  )
}
