'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600 mt-1">View system analytics and reports</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        Total Revenue
                    </h2>
                    <p className="text-4xl font-bold text-gray-900 mb-2">$234,560</p>
                    <p className="text-green-600 text-sm">↑ 12% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-indigo-600" />
                        Total Transactions
                    </h2>
                    <p className="text-4xl font-bold text-gray-900 mb-2">12,450</p>
                    <p className="text-green-600 text-sm">↑ 8% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        Avg Transaction Value
                    </h2>
                    <p className="text-4xl font-bold text-gray-900 mb-2">$18.82</p>
                    <p className="text-green-600 text-sm">↑ 5% from last month</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would go here</p>
                </div>
            </div>
        </div>
    );
}
