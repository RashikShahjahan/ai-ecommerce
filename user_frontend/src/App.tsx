import { AppRoutes } from './Routes'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </CartProvider>
  )
}

export default App