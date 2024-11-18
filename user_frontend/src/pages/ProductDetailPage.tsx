import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/mockData';
import type { Product } from '../types/types';

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariantId, setSelectedVariantId] = useState<string>('');

    // Find the product from our mock data
    const product = products.find(p => p.id === id);

    // Get the selected variant or default to the first one
    const selectedVariant = product?.variants.find(v => v.id === selectedVariantId)
        || product?.variants[0];

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-red-500">Product not found</div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        console.log('Adding to cart:', {
            product,
            variant: selectedVariant,
            quantity
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {product.name}
                    </h1>
                    <p className="text-gray-400 mb-4">
                        {product.category.name}
                    </p>
                    <p className="text-gray-300 mb-6">
                        {product.description}
                    </p>

                    {/* Variant Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Select Variant
                        </label>
                        <select
                            value={selectedVariantId}
                            onChange={(e) => setSelectedVariantId(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                        >
                            {product.variants.map((variant) => (
                                <option key={variant.id} value={variant.id}>
                                    {variant.color}
                                    {variant.size ? ` - ${variant.size}` : ''}
                                    - ${variant.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price and Stock */}
                    {selectedVariant && (
                        <div className="mb-6">
                            <p className="text-2xl font-bold text-white mb-2">
                                ${selectedVariant.price.toFixed(2)}
                            </p>
                            <p className="text-gray-400">
                                {selectedVariant.stock} in stock
                            </p>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Quantity
                        </label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="bg-gray-700 text-white px-3 py-1 rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 bg-gray-700 text-white text-center rounded px-2 py-1"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="bg-gray-700 text-white px-3 py-1 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedVariant || selectedVariant.stock === 0}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600"
                    >
                        {selectedVariant?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}