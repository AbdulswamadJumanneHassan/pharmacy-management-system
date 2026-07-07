# Frontend Documentation

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth routes (public)
│   │   └── login/
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── super-admin/
│   │   ├── pharmacy-admin/
│   │   ├── pharmacist/
│   │   ├── cashier/
│   │   └── inventory/
│   ├── layout.tsx           # Root layout with AuthProvider
│   ├── page.tsx             # Home page (redirects to dashboard)
│   └── not-found.tsx        # 404 page
├── components/              # Reusable UI components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── index.ts
├── context/
│   └── AuthContext.tsx      # Authentication context
├── hooks/
│   └── useAuth.ts           # Auth hook
├── lib/
│   └── axios.ts             # Axios instance with interceptors
└── types/
    └── index.ts             # TypeScript types
```

## Authentication Flow

1. **Login Page**: Users visit `/login` and enter credentials
2. **Authentication**: Credentials are sent to `/api/v1/auth/login`
3. **Token Storage**: Access and refresh tokens are stored in localStorage
4. **Protected Routes**: Dashboard pages check authentication in useEffect
5. **Automatic Redirect**: Unauthenticated users are redirected to `/login`
6. **Token Refresh**: Axios interceptor handles 401 responses with token refresh

## Role-Based Access

Different dashboards based on user role:
- **SUPER_ADMIN**: `/dashboard/super-admin` - Manage all pharmacies and users
- **PHARMACY_ADMIN**: `/dashboard/pharmacy-admin` - Manage single pharmacy
- **PHARMACIST**: `/dashboard/pharmacist` - Manage prescriptions
- **CASHIER**: `/dashboard/cashier` - Process sales
- **INVENTORY_MANAGER**: `/dashboard/inventory` - Manage inventory

## Key Features

### Pages Implemented
- ✅ Login page with error handling
- ✅ Dashboard landing page for each role
- ✅ Pharmacy management (Super Admin)
- ✅ User management (Super Admin)
- ✅ Reports (Super Admin)
- ✅ Products management (Pharmacy Admin)
- ✅ Sales management (Pharmacy Admin)
- ✅ Inventory tracking (Pharmacy Admin)
- ✅ Staff management (Pharmacy Admin)
- ✅ Prescriptions (Pharmacist)
- ✅ Sales processing (Cashier)
- ✅ Stock management (Inventory Manager)
- ✅ Purchase orders (Inventory Manager)

### Components Provided
- **Button**: Reusable button with variants (primary, secondary, danger)
- **Card**: Content card container
- **Badge**: Status badge
- **Modal**: Dialog box
- **Alert**: Alert messages (success, error, warning, info)
- **Input**: Form input with validation
- **Select**: Form select with options
- **Sidebar**: Navigation sidebar
- **TopBar**: Header bar with user info

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Integration

All API calls go through `/api/:path*` which is proxied to the backend via `next.config.ts`:
- Backend: `http://localhost:8080/api/:path*`
- Frontend: `http://localhost:3000/api/:path*`

## Security

- Access tokens stored in localStorage
- Refresh tokens used for token rotation
- JWT Bearer authentication in all API requests
- Protected routes with auth checks
- Automatic redirect on unauthorized access

## Next Steps

To fully implement:
1. Create modals for add/edit operations
2. Add form validation with react-hook-form
3. Implement data fetching with SWR or React Query
4. Add toast notifications
5. Implement search and pagination
6. Add filters and sorting
7. Create print/export features
8. Add real-time updates with WebSocket
