import React, { useState } from 'react';

// Mock data type definition
interface Order {
    id: string;
    userId: string;
    userName: string;
    products: {
        name: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    createdAt: string;
}

// Mock data
const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        userId: 'USR-001',
        userName: 'John Doe',
        products: [
            { name: 'Ethereal Essence', quantity: 2, price: 29.99 },
            { name: 'Mystic Mist', quantity: 1, price: 19.99 }
        ],
        totalAmount: 79.97,
        status: 'completed',
        createdAt: '2024-03-15T10:30:00Z'
    },
    {
        id: 'ORD-002',
        userId: 'USR-002',
        userName: 'Jane Smith',
        products: [
            { name: 'Celestial Crystal', quantity: 1, price: 49.99 }
        ],
        totalAmount: 49.99,
        status: 'pending',
        createdAt: '2024-03-16T14:20:00Z'
    },
    {
        id: 'ORD-003',
        userId: 'USR-003',
        userName: 'Alice Johnson',
        products: [
            { name: 'Ethereal Essence', quantity: 3, price: 29.99 },
            { name: 'Mystic Mist', quantity: 2, price: 19.99 }
        ],
        totalAmount: 129.95,
        status: 'processing',
        createdAt: '2024-03-16T15:45:00Z'
    }
];

function Orders() {
    // Add state for filters
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter orders based on status and search query
    const filteredOrders = mockOrders.filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesSearch = order.userName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
            <h2 className="text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 mb-8">
                Order Management
            </h2>

            {/* Add filter controls */}
            <div className="mb-6 flex gap-4 items-center">
                <div className="flex items-center gap-2">
                    <label className="text-purple-200">Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-purple-200">Search:</label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by customer name..."
                        className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500/50 w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-purple-500/20">
                <table className="w-full table-auto">
                    <thead className="bg-purple-900/30 text-purple-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Order ID</th>
                            <th className="px-6 py-4 text-left">Customer</th>
                            <th className="px-6 py-4 text-left">Products</th>
                            <th className="px-6 py-4 text-right">Total Amount</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/10">
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                                <td className="px-6 py-4 text-purple-200">{order.id}</td>
                                <td className="px-6 py-4 text-gray-200">{order.userName}</td>
                                <td className="px-6 py-4 text-gray-200">
                                    <div className="space-y-1">
                                        {order.products.map((product, idx) => (
                                            <div key={idx} className="text-sm">
                                                {product.quantity}x {product.name}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-200">
                                    ${order.totalAmount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-center flex justify-center">
                                    <span className={`inline-flex justify-center px-3 py-1 text-sm rounded-full ${{
                                        pending: 'bg-yellow-500/20 text-yellow-200',
                                        processing: 'bg-blue-500/20 text-blue-200',
                                        completed: 'bg-green-500/20 text-green-200',
                                        cancelled: 'bg-red-500/20 text-red-200'
                                    }[order.status]
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-200">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;