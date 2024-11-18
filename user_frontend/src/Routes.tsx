import { Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ProductListingPage } from './pages/ProductListingPage'

function Home() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-gray-300">This is the home page of our e-commerce site.</p>
        </div>
    )
}

function ProductDetail() {
    const params = useParams<{ id: string }>()
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Product Detail</h1>
            <p className="text-gray-300">Viewing product ID: {params.id}</p>
        </div>
    )
}

function Cart() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
            <p className="text-gray-300">Your cart is empty</p>
        </div>
    )
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}