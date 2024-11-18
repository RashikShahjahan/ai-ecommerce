import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext';

export function Layout({ children }: { children: React.ReactNode }) {
    const { items } = useCart();

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="bg-gray-800 shadow-lg">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-white">
                                EcomStore
                            </Link>
                        </div>
                        <div className="flex gap-6">
                            <Link
                                to="/"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Products
                            </Link>
                            <Link
                                to="/cart"
                                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                            >
                                <span>Cart</span>
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                    {items.length}
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            <footer className="bg-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-400 text-sm">
                        <p>© 2024 EcomStore. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
} 