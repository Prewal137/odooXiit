-- Create custom ENUM types for better type safety and consistency
CREATE TYPE user_role AS ENUM ('Employee', 'Manager', 'Admin');
CREATE TYPE expense_status AS ENUM ('Pending', 'Processing', 'Approved', 'Rejected');
CREATE TYPE approval_status AS ENUM ('Pending', 'Approved', 'Rejected');

-- ===============================================================
-- Table: Companies
-- ===============================================================
CREATE TABLE "Companies" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===============================================================
-- Table: Users
-- ===============================================================
CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "role" user_role NOT NULL DEFAULT 'Employee',
    "companyId" INTEGER NOT NULL REFERENCES "Companies"("id") ON DELETE CASCADE,
    "managerId" INTEGER REFERENCES "Users"("id") ON DELETE SET NULL, -- Self-referencing key for manager relationship
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===============================================================
-- Table: Expenses
-- ===============================================================
CREATE TABLE "Expenses" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "category" VARCHAR(100),
    "date" DATE NOT NULL,
    "status" expense_status NOT NULL DEFAULT 'Pending',
    "receiptUrl" VARCHAR(255),
    "userId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===============================================================
-- Table: ExpenseApprovals
-- ===============================================================
CREATE TABLE "ExpenseApprovals" (
    "id" SERIAL PRIMARY KEY,
    "expenseId" INTEGER NOT NULL REFERENCES "Expenses"("id") ON DELETE CASCADE,
    "approverId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
    "status" approval_status NOT NULL DEFAULT 'Pending',
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "comment" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===============================================================
-- Indexes for Performance
-- ===============================================================
CREATE INDEX idx_users_company_id ON "Users"("companyId");
CREATE INDEX idx_users_manager_id ON "Users"("managerId");
CREATE INDEX idx_expenses_user_id ON "Expenses"("userId");
CREATE INDEX idx_expense_approvals_expense_id ON "ExpenseApprovals"("expenseId");
CREATE INDEX idx_expense_approvals_approver_id ON "ExpenseApprovals"("approverId");

\echo 'Database schema created successfully!'