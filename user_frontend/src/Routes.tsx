import { Routes, Route } from 'react-router-dom';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { useCart } from './context/CartContext';

function Home() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-gray-300">This is the home page of our e-commerce site.</p>
        </div>
    );
}

function Cart() {
    const { items, removeFromCart } = useCart();
    const total = items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
            {items.length === 0 ? (
                <p className="text-gray-300">Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.variantId} className="flex justify-between items-center bg-gray-800 p-4 rounded">
                            <div>
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-gray-400">
                                    {item.variant.color}
                                    {item.variant.size && ` - ${item.variant.size}`}
                                </p>
                                <p className="text-gray-400">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-lg">${(item.variant.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.variantId)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right text-xl font-bold pt-4">
                        Total: ${total.toFixed(2)}
                    </div>
                </div>
            )}
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