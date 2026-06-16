-- ============================================================
-- PMS Database Schema – V1
-- ============================================================

-- Roles
CREATE TABLE roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(50)  NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Permissions
CREATE TABLE permissions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Role–Permission join
CREATE TABLE role_permissions (
    role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Pharmacies (Multi-tenant root)
CREATE TABLE pharmacies (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(255) NOT NULL,
    license_no   VARCHAR(100),
    email        VARCHAR(255),
    phone        VARCHAR(50),
    address      TEXT,
    city         VARCHAR(100),
    region       VARCHAR(100),
    country      VARCHAR(100) NOT NULL DEFAULT 'Tanzania',
    is_active    BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at   TIMESTAMP
);

-- Users
CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pharmacy_id    UUID REFERENCES pharmacies(id),
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    email          VARCHAR(255) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    phone          VARCHAR(50),
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at  TIMESTAMP,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at     TIMESTAMP,
    created_by     UUID,
    updated_by     UUID
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_pharmacy_id ON users(pharmacy_id);

-- User–Role join
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Refresh Tokens
CREATE TABLE refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token       TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMP NOT NULL,
    revoked     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);

-- ============================================================
-- Seed Roles
-- ============================================================
INSERT INTO roles (id, name, description) VALUES
    ('11111111-0000-0000-0000-000000000001', 'SUPER_ADMIN',        'Platform-wide administrator'),
    ('11111111-0000-0000-0000-000000000002', 'PHARMACY_ADMIN',     'Manages a single pharmacy and its branches'),
    ('11111111-0000-0000-0000-000000000003', 'PHARMACIST',         'Dispenses medicines and processes prescriptions'),
    ('11111111-0000-0000-0000-000000000004', 'CASHIER',            'Handles POS sales and payments'),
    ('11111111-0000-0000-0000-000000000005', 'INVENTORY_MANAGER',  'Manages stock, suppliers, and purchase orders');

-- Seed Demo Pharmacy
INSERT INTO pharmacies (id, name, license_no, email, phone, city, region) VALUES
    ('22222222-0000-0000-0000-000000000001', 'PharmaLink Demo Pharmacy', 'TZ-PH-2024-001',
     'admin@pharmalink.tz', '+255 712 000 001', 'Dar es Salaam', 'Dar es Salaam');

-- Seed Demo Users (passwords = Admin@1234 — BCrypt)
INSERT INTO users (id, pharmacy_id, first_name, last_name, email, password_hash, is_active, is_super_admin) VALUES
    ('33333333-0000-0000-0000-000000000001', NULL,
     'Super', 'Admin', 'superadmin@pms.tz',
     '$2a$12$LkJ3n7sRmBXr5pKPt8y9IeK2RuQ8vW1dFz6xY4mN0oG7cA3tHj9Pu', TRUE, TRUE),
    ('33333333-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001',
     'Amina', 'Saleh', 'pharmacyadmin@pms.tz',
     '$2a$12$LkJ3n7sRmBXr5pKPt8y9IeK2RuQ8vW1dFz6xY4mN0oG7cA3tHj9Pu', TRUE, FALSE),
    ('33333333-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000001',
     'Hassan', 'Mwamba', 'pharmacist@pms.tz',
     '$2a$12$LkJ3n7sRmBXr5pKPt8y9IeK2RuQ8vW1dFz6xY4mN0oG7cA3tHj9Pu', TRUE, FALSE),
    ('33333333-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000001',
     'Fatuma', 'Juma', 'cashier@pms.tz',
     '$2a$12$LkJ3n7sRmBXr5pKPt8y9IeK2RuQ8vW1dFz6xY4mN0oG7cA3tHj9Pu', TRUE, FALSE),
    ('33333333-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000001',
     'Omar', 'Bakari', 'inventory@pms.tz',
     '$2a$12$LkJ3n7sRmBXr5pKPt8y9IeK2RuQ8vW1dFz6xY4mN0oG7cA3tHj9Pu', TRUE, FALSE);

-- Assign Roles
INSERT INTO user_roles (user_id, role_id) VALUES
    ('33333333-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001'),
    ('33333333-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002'),
    ('33333333-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000003'),
    ('33333333-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000004'),
    ('33333333-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000005');
