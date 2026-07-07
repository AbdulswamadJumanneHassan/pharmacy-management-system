'use client';

import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

export default function PharmaciistProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-1">Browse available pharmacy products</p>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
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
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Product Name</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Category</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Stock</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Unit Price</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium text-gray-900">Product {i}</td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {['Antibiotics', 'Painkillers', 'Vitamins', 'Topical', 'Injectable'][i - 1]}
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{150 - i * 10} units</td>
                                    <td className="py-3 px-6 font-semibold text-gray-900">${(20 + i * 5).toFixed(2)}</td>
                                    <td className="py-3 px-6">
                                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
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
