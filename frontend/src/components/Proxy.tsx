import { useState } from 'react'
import axios from 'axios'

export default function Proxy() {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setContent(null)

    try {
      const response = await axios.post('/api/proxy/fetch', { url })
      setContent(response.data.content)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-32 px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">🌐 Unblock Sites</h2>
          
          <form onSubmit={handleFetch} className="mb-8">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className="flex-1 px-6 py-4 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-4 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Fetch'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {content && (
            <div className="bg-white/5 rounded-lg p-6 max-h-96 overflow-y-auto border border-white/10">
              <p className="text-white/60 text-sm mb-4">Content preview:</p>
              <div className="text-white/80 text-sm font-mono whitespace-pre-wrap break-words">
                {content.substring(0, 500)}...
              </div>
            </div>
          )}

          {!content && !error && !loading && (
            <div className="text-white/60 text-center py-12">
              Enter a URL and click "Fetch" to view the content through the proxy
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            { title: 'How it works', desc: '1. Enter any URL\n2. Click Fetch\n3. View content instantly' },
            { title: 'Safe & Secure', desc: 'Your requests are encrypted and anonymous' }
          ].map((info, i) => (
            <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-bold mb-3">{info.title}</h3>
              <p className="text-white/70 whitespace-pre-line">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
