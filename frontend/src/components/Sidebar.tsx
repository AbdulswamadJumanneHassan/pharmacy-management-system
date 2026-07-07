'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    Package,
    ShoppingCart,
    BarChart3,
    Settings,
    Users,
    LogOut,
} from 'lucide-react';

const sidebarLinks = {
    SUPER_ADMIN: [
        { label: 'Dashboard', href: '/dashboard/super-admin', icon: LayoutDashboard },
        { label: 'Pharmacies', href: '/dashboard/super-admin/pharmacies', icon: Building2 },
        { label: 'Users', href: '/dashboard/super-admin/users', icon: Users },
        { label: 'Reports', href: '/dashboard/super-admin/reports', icon: BarChart3 },
    ],
    PHARMACY_ADMIN: [
        { label: 'Dashboard', href: '/dashboard/pharmacy-admin', icon: LayoutDashboard },
        { label: 'Products', href: '/dashboard/pharmacy-admin/products', icon: Package },
        { label: 'Sales', href: '/dashboard/pharmacy-admin/sales', icon: ShoppingCart },
        { label: 'Inventory', href: '/dashboard/pharmacy-admin/inventory', icon: BarChart3 },
        { label: 'Staff', href: '/dashboard/pharmacy-admin/staff', icon: Users },
    ],
    PHARMACIST: [
        { label: 'Dashboard', href: '/dashboard/pharmacist', icon: LayoutDashboard },
        { label: 'Products', href: '/dashboard/pharmacist/products', icon: Package },
        { label: 'Prescriptions', href: '/dashboard/pharmacist/prescriptions', icon: BarChart3 },
    ],
    CASHIER: [
        { label: 'Dashboard', href: '/dashboard/cashier', icon: LayoutDashboard },
        { label: 'Sales', href: '/dashboard/cashier/sales', icon: ShoppingCart },
    ],
    INVENTORY_MANAGER: [
        { label: 'Dashboard', href: '/dashboard/inventory', icon: LayoutDashboard },
        { label: 'Inventory', href: '/dashboard/inventory/stock', icon: Package },
        { label: 'Orders', href: '/dashboard/inventory/orders', icon: ShoppingCart },
    ],
};

export function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    if (!user) {
        return (
            <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </aside>
        );
    }

    const links = sidebarLinks[user.role] || [];

    return (
        <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold">Pharmacy PMS</h2>
                <p className="text-sm text-gray-400 mt-1">{user.role.replace(/_/g, ' ')}</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {links.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800 space-y-2">
                <div className="px-4 py-2 rounded-lg bg-gray-800">
                    <p className="text-xs text-gray-400">Logged in as</p>
                    <p className="text-sm font-medium text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
