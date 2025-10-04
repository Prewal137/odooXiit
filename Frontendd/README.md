# ExpenseFlow - Expense Management System

A comprehensive expense management system with user onboarding, expense submission, approval workflows, and admin controls.

## Features

### 1. User Onboarding & Company Setup
- Automatic company creation with selected country's currency
- First user becomes Admin
- Role-based access control (Admin, Manager, Employee)

### 2. Expense Submission (Employee Role)
- Submit expense claims with Amount, Category, Description, Date, and Receipt
- OCR support for receipt scanning
- Expense history tracking with approval status

### 3. Approval Workflow (Manager/Admin Role)
- Multi-level approval process
- Manager reviews first, then moves to next level
- Admin override capability

### 4. Conditional Approval Rules
- Percentage-based approval rules
- Specific approver rules (e.g., CFO approval)
- Hybrid rules combining both

### 5. Role Permissions
- **Admin**: Create company, manage users/roles, configure rules, view all expenses, override approvals
- **Manager**: Approve/reject expenses, view team expenses
- **Employee**: Submit expenses, view personal expense history

### 6. APIs & Integrations
- Country & Currency API
- Exchange Rate API
- OCR API for receipt processing

## Tech Stack
- React.js
- React Router
- CSS3 (Responsive Design)
- Vite (Build Tool)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure
```
src/
├── api/              # API functions
├── assets/           # Static assets
├── components/       # Reusable UI components
│   └── layout/       # Layout components
├── context/          # Global state management
├── hooks/            # Custom hooks
├── pages/            # Page components
├── styles/           # Global styles
├── App.js            # Main app component
└── index.js          # Entry point
```

## Responsive Design
The application is fully responsive and works on mobile, tablet, and desktop devices.