# Odoo Expense Management System

## Project Structure
```
odooXiit/
├── Frontendd/          # React frontend application
└── backend/            # Node.js/Express backend API
```

## Setup and Running

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=expense_management

   # Server Configuration
   PORT=8080

   # JWT Secret (change this to a secure random string)
   JWT_SECRET=expense_management_secret_key
   ```

4. Make sure PostgreSQL is running and the database specified in `DB_NAME` exists.

5. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd Frontendd
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Integration Details

The frontend and backend are integrated through RESTful API calls:

- Frontend runs on: http://localhost:5173
- Backend API runs on: http://localhost:8080

All API endpoints are prefixed with `/api`:
- Authentication: `/api/auth/signup`, `/api/auth/signin`
- Expenses: `/api/expenses`

The frontend uses an `apiClient` utility to make HTTP requests to the backend with proper headers and error handling.

## Database Schema

The application uses PostgreSQL with the following tables:
- `users`: Stores user information (id, name, email, password, role)
- `companies`: Stores company information (id, name, currency)
- `expenses`: Stores expense information (id, description, amount, currency, category, date, status, receiptUrl, paidBy)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
1. Users sign up or sign in through the `/api/auth/signup` or `/api/auth/signin` endpoints
2. Upon successful authentication, the server returns a JWT token
3. The frontend stores this token in localStorage and includes it in the `x-access-token` header for subsequent requests
4. The backend middleware verifies the token before allowing access to protected routes