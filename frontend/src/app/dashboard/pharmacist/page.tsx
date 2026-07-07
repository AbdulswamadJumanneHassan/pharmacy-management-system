'use client';

import React from 'react';
import { Package, AlertCircle, CheckCircle } from 'lucide-react';

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

export default function PharmacistDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Pharmacist Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage prescriptions and inventory</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Package}
                    label="Products Available"
                    value="890"
                    color="bg-blue-100"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Pending Prescriptions"
                    value="23"
                    color="bg-yellow-100"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Completed Today"
                    value="156"
                    color="bg-green-100"
                />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Prescriptions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Prescription ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">RX-2024-{i.toString().padStart(5, '0')}</td>
                                    <td className="py-3 px-4">Patient {i}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            i % 2 === 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {i % 2 === 0 ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">2024-01-{10 + i}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
