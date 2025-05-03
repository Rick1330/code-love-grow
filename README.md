
# Task Manager - Full Stack Application

A comprehensive task management application built with React, TypeScript, and Node.js.

## Features

- User authentication (signup, login, logout)
- Project management
- Task tracking
- Time tracking
- Achievement system
- Settings and profile management

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

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (installed locally or a MongoDB Atlas account)

### Setup Instructions

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

## API Documentation

The API documentation can be found in the BACKEND_API_DOCS.md file.

## Development Notes

- The frontend makes API calls to the backend using Axios
- Authentication is managed using JWT tokens stored in localStorage
- Protected routes redirect unauthenticated users to the login page

## Deploying to Production

### Backend
1. Set up your production MongoDB database
2. Configure environment variables for production
3. Deploy the backend to your hosting service (Heroku, Digital Ocean, AWS, etc.)

### Frontend
1. Build the frontend:
   ```
   npm run build
   ```
2. Deploy the build folder to your hosting service
