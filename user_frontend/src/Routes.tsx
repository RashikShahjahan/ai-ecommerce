import { Routes, Route } from 'react-router-dom';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

function Home() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-gray-300">This is the home page of our e-commerce site.</p>
        </div>
    );
}

function Cart() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
            <p className="text-gray-300">Your cart is empty</p>
        </div>
    );
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}