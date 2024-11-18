import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  )
}

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 animate-[spin_20s_linear_infinite] hover:drop-shadow-[0_0_2em_#61dafbaa]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold mt-8">Vite + React</h1>
      <div className="mt-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <p className="text-gray-300 mb-4">
        This is a sample React application built with:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>Vite</li>
        <li>React Router</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App