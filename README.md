
# Task Manager - Full Stack Application

A comprehensive task management application built with React, TypeScript, and Node.js.

## Features

- User authentication (signup, login, logout)
- Project management
- Task tracking
- Time tracking
- Achievement system
- Settings and profile management
- Role-based access control

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- TanStack Query for data fetching
- Tailwind CSS for styling
- Shadcn UI components
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (installed locally or a MongoDB Atlas account)
- Bun (optional but recommended for improved performance)

### Using Bun Runtime

This project supports Bun as an alternative to Node.js for faster performance.

#### Installing Bun
```bash
# For macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash

# For Windows (via npm)
npm install -g bun
```

#### Running the Project with Bun
```bash
# Install dependencies
bun install

# Run frontend
bun run dev

# Run backend
cd backend
bun run dev
```

#### Common Bun Issues
- **Compatibility**: Some Node.js packages may not be fully compatible with Bun
- **Windows Support**: Bun has limited Windows support; WSL is recommended
- **Extensions**: Some VS Code extensions may not work with Bun

### Standard Setup (Node.js)

#### Backend Setup

1. Create a MongoDB database (locally or on MongoDB Atlas)
2. Navigate to the backend folder:
   ```
   cd backend
   ```
3. Copy the .env.example file to .env:
   ```
   cp .env.example .env
   ```
4. Edit the .env file with your MongoDB connection string and JWT secret
5. Install dependencies:
   ```
   npm install
   ```
6. Start the backend server:
   ```
   npm start
   ```
   The server should start on port 5000.

#### Frontend Setup

1. In a separate terminal, navigate to the project root
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend:
   ```
   npm run dev
   ```
   The app should be available at http://localhost:5173

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
npm test
```

## Directory Structure

```
/
├── src/               # Frontend code
├── backend/           # Backend code
│   ├── controllers/   # Business logic
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── tests/         # Test files
│   └── server.js      # Main server file
├── docs/              # Documentation
└── README.md          # Project overview
```

## API Documentation

The API documentation can be found in the BACKEND_API_DOCS.md file.

## Deployment

For deployment instructions, please refer to the docs/deployment-guide.md file.

