'use client';

import React, { useState } from 'react';
import { Plus, Search, Check, X } from 'lucide-react';

export default function PrescriptionsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
                    <p className="text-gray-600 mt-1">Manage patient prescriptions</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search prescriptions..."
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
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Prescription ID</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Patient</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Drug</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Quantity</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium text-gray-900">RX-{i.toString().padStart(5, '0')}</td>
                                    <td className="py-3 px-6 text-gray-600">Patient {i}</td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {['Amoxicillin', 'Ibuprofen', 'Aspirin', 'Metformin'][i - 1]}
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{3 + i} tablets</td>
                                    <td className="py-3 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            i === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {i === 1 ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <X className="w-4 h-4" />
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
