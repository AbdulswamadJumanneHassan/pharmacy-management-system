'use client';

import React from 'react';
import { BarChart3, Users, Building2, TrendingUp } from 'lucide-react';

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

export default function SuperAdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's your system overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Building2}
                    label="Total Pharmacies"
                    value="24"
                    change="3"
                />
                <StatCard
                    icon={Users}
                    label="Total Users"
                    value="128"
                    change="12"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Total Revenue"
                    value="$45,231"
                    change="8%"
                />
                <StatCard
                    icon={BarChart3}
                    label="Active Orders"
                    value="340"
                    change="5"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Pharmacies</h2>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Pharmacy {i}</p>
                                    <p className="text-sm text-gray-600">Location {i}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">System Health</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">API Uptime</p>
                                <p className="font-semibold text-gray-900">99.9%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">Database Health</p>
                                <p className="font-semibold text-gray-900">95%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
