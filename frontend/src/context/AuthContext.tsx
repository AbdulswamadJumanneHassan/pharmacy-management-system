'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { User, LoginResponse, UserRole } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: '/dashboard/super-admin',
    PHARMACY_ADMIN: '/dashboard/pharmacy-admin',
    PHARMACIST: '/dashboard/pharmacist',
    CASHIER: '/dashboard/cashier',
    INVENTORY_MANAGER: '/dashboard/inventory',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Rehydrate from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('pms_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.clear();
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const { data } = await api.post<{ data: LoginResponse }>('/auth/login', {
            email,
            password,
        });
        const resp = data.data;

        localStorage.setItem('accessToken', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);

        const u: User = {
            userId: resp.userId,
            email: resp.email,
            fullName: resp.fullName,
            role: resp.role,
            pharmacyId: resp.pharmacyId,
            pharmacyName: resp.pharmacyName,
            superAdmin: resp.superAdmin,
        };
        localStorage.setItem('pms_user', JSON.stringify(u));
        setUser(u);
        router.replace(dashboardRoute[resp.role]);
    }, [router]);

    const logout = useCallback(async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                await api.post('/auth/logout', { refreshToken });
            } catch {/* silent */ }
        }
        localStorage.clear();
        setUser(null);
        router.replace('/login');
    }, [router]);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
