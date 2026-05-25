interface HeroProps {
  setActiveTab: (tab: 'home' | 'proxy' | 'games' | 'search') => void
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <section className="min-h-screen pt-32 px-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Access Anything, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Freely</span>
        </h1>
        
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Unblock any website, search the web, and play games without restrictions. Fast, secure, and with a beautiful design.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => setActiveTab('proxy')}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
          >
            🌐 Start Proxy
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className="px-8 py-4 bg-purple-500/30 text-white rounded-xl font-bold text-lg hover:bg-purple-500/50 transition-all transform hover:scale-105 border border-white/30"
          >
            🎮 Play Games
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized proxy for maximum speed' },
            { icon: '🔒', title: 'Privacy First', desc: 'Your data stays safe and encrypted' },
            { icon: '🎯', title: 'No Limits', desc: 'Access any site freely and easily' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
