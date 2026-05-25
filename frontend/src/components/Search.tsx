import { useState } from 'react'
import axios from 'axios'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await axios.post('/api/search', { query })
      setResults(response.data.results || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-20 max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">🔍 Search the Web</h2>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything..."
              className="flex-1 px-6 py-4 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-white font-bold mb-4">Results:</h3>
            {results.slice(0, 5).map((result, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/10 hover:bg-white/20 transition-all">
                <p className="text-white">{result.title || result.text || 'Result'}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-white/60 text-center">No results found</p>
        )}
      </div>
    </section>
  )
}
