import { Link } from 'react-router-dom';
import { Product } from '../types/types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Get the lowest price from variants
    const lowestPrice = Math.min(...product.variants.map(v => v.price));
    // Get total stock across all variants
    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                </Link>
                <p className="text-gray-400 text-sm mb-2">{product.category.name}</p>
                <p className="text-gray-300 mb-2">From ${lowestPrice.toFixed(2)}</p>
                <p className="text-gray-400 text-sm mb-4">{totalStock} in stock</p>
                <button
                    onClick={() => console.log('View product:', product.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    View Options
                </button>
            </div>
        </div>
    );
}