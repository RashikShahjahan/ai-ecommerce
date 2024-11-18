import { useState, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';

// Dummy data for testing
const DUMMY_PRODUCTS = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        imageUrl: 'https://placeholder.com/400x300',
        description: 'High-quality wireless headphones'
    },
    {
        id: '2',
        name: 'Smartphone',
        price: 699.99,
        imageUrl: 'https://placeholder.com/400x300',
        description: 'Latest model smartphone'
    },
    // Add more dummy products as needed
];

export function ProductListingPage() {
    const [products, setProducts] = useState(DUMMY_PRODUCTS);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-gray-300">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-gray-300">No products found</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            <ProductGrid products={products} />
        </div>
    );
}