import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

function CreateOrder() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [items, setItems] = useState<OrderItem[]>([
        { id: '', name: '', price: 0, quantity: 1 }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleAddItem = () => {
        setItems([...items, { id: '', name: '', price: 0, quantity: 1 }]);
    };

    const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                userId,
                items: items.map(item => item.id), // Send only item IDs as per API requirement
                totalPrice: calculateTotal()
            };

            await axios.post('http://localhost:3001/api/orders', orderData);
            navigate('/orders'); // Redirect to orders list after success
        } catch (err) {
            setError('Failed to create order. Please try again.');
            console.error('Error creating order:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
            <h2 className="text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 mb-8">
                Create New Order
            </h2>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                    <label className="block text-purple-200">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-purple-200">Order Items</label>
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Add Item
                        </button>
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4">
                            <input
                                type="text"
                                placeholder="Item ID"
                                value={item.id}
                                onChange={(e) => handleItemChange(index, 'id', e.target.value)}
                                className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="text-right text-purple-200">
                    Total: ${calculateTotal().toFixed(2)}
                </div>

                {error && <div className="text-red-400">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-purple-600 text-purple-100 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-800"
                >
                    {loading ? 'Creating...' : 'Create Order'}
                </button>
            </form>
        </div>
    );
}

export default CreateOrder;