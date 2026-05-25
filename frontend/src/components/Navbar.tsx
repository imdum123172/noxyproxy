interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: 'home' | 'proxy' | 'games' | 'search') => void
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">🚀</span>
          </div>
          <h1 className="text-white font-bold text-2xl">NoxyProxy</h1>
        </div>
        
        <div className="flex gap-1">
          {[
            { label: 'Home', value: 'home' },
            { label: 'Proxy', value: 'proxy' },
            { label: 'Games', value: 'games' },
            { label: 'Search', value: 'search' }
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === value
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'text-white/70 hover:text-white/90'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
