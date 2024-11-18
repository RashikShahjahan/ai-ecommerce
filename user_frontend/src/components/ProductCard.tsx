import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <Link to={`/products/${id}`}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/products/${id}`}>
                    <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
                </Link>
                <p className="text-gray-300 mb-4">${price.toFixed(2)}</p>
                <button
                    onClick={() => console.log('Add to cart:', id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}