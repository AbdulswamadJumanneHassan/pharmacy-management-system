'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function CashierSalesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
                    <p className="text-gray-600 mt-1">Process sales and manage transactions</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    New Transaction
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Today's Sales</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">$2,450</p>
                    <p className="text-green-600 text-sm mt-2">156 transactions</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Average Value</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">$15.70</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Pending</p>
                    <p className="text-4xl font-bold text-orange-600 mt-2">3</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
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
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Transaction ID</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Time</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Items</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium text-gray-900">TXN-{i.toString().padStart(6, '0')}</td>
                                    <td className="py-3 px-6 text-gray-600">10:{10 + i}:00</td>
                                    <td className="py-3 px-6 text-gray-600">{2 + i} items</td>
                                    <td className="py-3 px-6 font-semibold text-gray-900">${(20 + i * 10).toFixed(2)}</td>
                                    <td className="py-3 px-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
