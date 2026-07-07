'use client';

import React from 'react';
import { ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

function StatCard({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                    <Icon className="w-8 h-8 text-indigo-600" />
                </div>
            </div>
        </div>
    );
}

export default function CashierDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cashier Dashboard</h1>
                <p className="text-gray-600 mt-1">Process sales and manage transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={ShoppingCart}
                    label="Today's Transactions"
                    value="124"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Sales"
                    value="$5,240"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Avg Transaction"
                    value="$42.26"
                />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sales</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">TXN-{i.toString().padStart(6, '0')}</td>
                                    <td className="py-3 px-4">{3 + i} items</td>
                                    <td className="py-3 px-4 font-semibold text-gray-900">${(35 + i * 10).toFixed(2)}</td>
                                    <td className="py-3 px-4 text-gray-600">10:{10 + i}:00 AM</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
