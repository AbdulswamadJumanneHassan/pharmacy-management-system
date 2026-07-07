'use client';

import React from 'react';
import { ShoppingCart, TrendingUp, Users, Package } from 'lucide-react';

function StatCard({ icon: Icon, label, value, change }: any) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    {change && (
                        <p className="text-green-600 text-sm mt-2">↑ {change} from last month</p>
                    )}
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                    <Icon className="w-8 h-8 text-indigo-600" />
                </div>
            </div>
        </div>
    );
}

export default function PharmacyAdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Pharmacy Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your pharmacy operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={ShoppingCart}
                    label="Today's Sales"
                    value="$2,450"
                    change="12%"
                />
                <StatCard
                    icon={Package}
                    label="Stock Items"
                    value="1,240"
                    change="5"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Monthly Revenue"
                    value="$34,500"
                    change="8%"
                />
                <StatCard
                    icon={Users}
                    label="Staff Members"
                    value="12"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Product {i}</p>
                                    <p className="text-sm text-gray-600">{100 - i * 10} units sold</p>
                                </div>
                                <p className="font-semibold text-indigo-600">${(i * 25).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Low Stock Alert</h2>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-red-900">Product {i}</p>
                                    <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
                                        {5 - i} units
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
