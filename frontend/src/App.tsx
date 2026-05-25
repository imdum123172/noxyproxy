import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import Games from './components/Games'
import Proxy from './components/Proxy'
import Footer from './components/Footer'

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'proxy' | 'games' | 'search'>('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'home' && (
        <>
          <Hero setActiveTab={setActiveTab} />
          <Search />
        </>
      )}
      
      {activeTab === 'proxy' && <Proxy />}
      {activeTab === 'games' && <Games />}
      {activeTab === 'search' && <Search />}
      
      <Footer />
    </div>
  )
}
