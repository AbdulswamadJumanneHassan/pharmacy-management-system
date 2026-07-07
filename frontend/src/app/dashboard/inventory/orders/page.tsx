'use client';

import React, { useState } from 'react';
import { Plus, Search, Eye } from 'lucide-react';

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
                    <p className="text-gray-600 mt-1">Manage supplier orders and deliveries</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Create Order
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Order ID</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Supplier</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Order Date</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Total Amount</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((i) => {
                                const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
                                const status = statuses[i - 1];
                                return (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-6 font-medium text-gray-900">PO-{i.toString().padStart(5, '0')}</td>
                                        <td className="py-3 px-6 text-gray-600">Supplier {i}</td>
                                        <td className="py-3 px-6 text-gray-600">2024-01-{10 + i}</td>
                                        <td className="py-3 px-6 font-semibold text-gray-900">${(1000 + i * 500).toFixed(2)}</td>
                                        <td className="py-3 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : status === 'Confirmed'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : status === 'Shipped'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
