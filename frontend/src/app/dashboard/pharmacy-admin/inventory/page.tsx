'use client';

import React from 'react';

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Monitor and manage pharmacy inventory</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Total Items in Stock</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">1,240</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Low Stock Items</p>
                    <p className="text-4xl font-bold text-red-600 mt-2">12</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm">Out of Stock</p>
                    <p className="text-4xl font-bold text-orange-600 mt-2">3</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Levels</h2>
                <div className="space-y-4">
                    {['Item A', 'Item B', 'Item C', 'Item D', 'Item E'].map((item, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-700">{item}</p>
                                <p className="text-sm font-semibold text-gray-900">{100 - i * 15}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${
                                        (100 - i * 15) > 50
                                            ? 'bg-green-600'
                                            : (100 - i * 15) > 20
                                            ? 'bg-yellow-600'
                                            : 'bg-red-600'
                                    }`}
                                    style={{ width: `${100 - i * 15}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
