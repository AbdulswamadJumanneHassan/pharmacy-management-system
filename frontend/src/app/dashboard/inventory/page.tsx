'use client';

import React from 'react';
import { Package, AlertTriangle, TrendingDown } from 'lucide-react';

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={`${color} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
}

export default function InventoryDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inventory Manager Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor stock levels and manage orders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Package}
                    label="Total Stock Items"
                    value="2,350"
                    color="bg-blue-100"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Low Stock Alert"
                    value="12"
                    color="bg-red-100"
                />
                <StatCard
                    icon={TrendingDown}
                    label="Pending Orders"
                    value="8"
                    color="bg-yellow-100"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Status</h2>
                    <div className="space-y-4">
                        {['Item A', 'Item B', 'Item C', 'Item D'].map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-700">{item}</p>
                                    <p className="text-sm font-semibold text-gray-900">{100 - i * 15}%</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${
                                            (100 - i * 15) > 50 ? 'bg-green-600' : 'bg-red-600'
                                        }`}
                                        style={{ width: `${100 - i * 15}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium text-gray-900">Order #{1000 + i}</p>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                        i === 1 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {i === 1 ? 'Delivered' : 'In Transit'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{50 + i * 20} units</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
