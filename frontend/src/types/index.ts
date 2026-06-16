export interface User {
    userId: string;
    email: string;
    fullName: string;
    role: UserRole;
    pharmacyId?: string;
    pharmacyName?: string;
    superAdmin: boolean;
}

export type UserRole =
    | 'SUPER_ADMIN'
    | 'PHARMACY_ADMIN'
    | 'PHARMACIST'
    | 'CASHIER'
    | 'INVENTORY_MANAGER';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    userId: string;
    email: string;
    fullName: string;
    role: UserRole;
    pharmacyId?: string;
    pharmacyName?: string;
    superAdmin: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    timestamp: string;
}
