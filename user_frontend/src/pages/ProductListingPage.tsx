import { useState, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/mockData';
import type { Product } from '../types/types';

export function ProductListingPage() {
    const [productList, setProductList] = useState<Product[]>(products);
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

    if (!productList.length) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-gray-300">No products found</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            <ProductGrid products={productList} />
        </div>
    );
}