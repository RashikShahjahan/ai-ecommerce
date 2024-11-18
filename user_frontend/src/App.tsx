import { Link } from 'react-router-dom'
import { AppRoutes } from './Routes'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link>
          <Link to="/cart" className="hover:text-gray-300 transition-colors">Cart</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App