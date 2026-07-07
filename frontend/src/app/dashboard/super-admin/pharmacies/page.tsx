'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export default function PharmaciesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pharmacies</h1>
                    <p className="text-gray-600 mt-1">Manage all pharmacies in the system</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Pharmacy
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search pharmacies..."
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
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Pharmacy Name</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Location</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Staff</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium text-gray-900">Pharmacy {i}</td>
                                    <td className="py-3 px-6 text-gray-600">Location {i}</td>
                                    <td className="py-3 px-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{5 + i} staff</td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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
