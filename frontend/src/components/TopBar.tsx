'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bell, User } from 'lucide-react';

export function TopBar() {
    const { user } = useAuth();

    if (!user) {
        return (
            <header className="bg-white border-b border-gray-200 px-6 py-4 h-16 flex items-center">
                <p className="text-gray-500">Loading...</p>
            </header>
        );
    }

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                    {user?.pharmacyName || 'Dashboard'}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                </button>

                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.fullName.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
}
