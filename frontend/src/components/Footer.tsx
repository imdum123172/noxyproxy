export default function Footer() {
  return (
    <footer className="bg-black/30 border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-white/60">NoxyProxy provides free access to any website with a beautiful interface and built-in games.</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Features</h3>
            <ul className="text-white/60 space-y-2">
              <li>🌐 Unblock any site</li>
              <li>🔍 Free web search</li>
              <li>🎮 Play games</li>
              <li>🔒 Privacy focused</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="text-white/60">Built with ❤️ for free internet</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/40">
          <p>&copy; 2024 NoxyProxy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
