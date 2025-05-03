
# Task Manager Application Setup Guide

This document provides comprehensive instructions for setting up and running the Task Manager application.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (v16 or higher)
- npm (usually comes with Node.js)
- Git
- MongoDB (local installation or MongoDB Atlas account)
- Docker and Docker Compose (optional, for containerized setup)

## Setting Up the Database

### Option 1: MongoDB Atlas (Recommended for production)

For setting up MongoDB Atlas, follow the instructions in [MongoDB Atlas Setup Guide](./mongodb-atlas-setup.md).

### Option 2: Local MongoDB Installation

If you prefer using a local MongoDB installation:

1. Install MongoDB Community Edition on your machine by following the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/).

2. Start the MongoDB service:
   ```
   mongod --dbpath /path/to/data/directory
   ```

3. The local connection string would be:
   ```
   mongodb://localhost:27017/task-manager
   ```

## Environment Configuration

1. Backend Environment Setup:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Copy the example environment file:
     ```
     cp .env.example .env
     ```
   - Edit the `.env` file with your MongoDB connection string and other configuration values:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_jwt_secret_string
     NODE_ENV=development
     ```

2. Frontend Environment Setup:
   - The frontend uses the environment variable `VITE_API_URL` to connect to the backend API.
   - This is automatically set in the Docker Compose file, but if you're running without Docker, you'll need to set it manually.

## Running the Application

### Option 1: Running Without Docker (Development)

1. Install Backend Dependencies:
   ```
   cd backend
   npm install
   ```

2. Start the Backend Server:
   ```
   npm run dev
   ```

3. In a new terminal, install Frontend Dependencies:
   ```
   cd ..  # Navigate to the root directory
   npm install
   ```

4. Start the Frontend Development Server:
   ```
   npm run dev
   ```

5. Access the application at http://localhost:8080

### Option 2: Running With Docker (Recommended)

1. Make sure Docker and Docker Compose are installed on your system.

2. From the root directory of the project, run:
   ```
   docker-compose up -d
   ```

3. This will start three containers:
   - MongoDB database
   - Backend API server
   - Frontend development server

4. Access the application at http://localhost:8080

## Verifying the Setup

1. The MongoDB database should be running and accessible to the backend server.
2. The backend server should be running on port 5000.
3. The frontend server should be running on port 8080.
4. You should be able to register a new user account and log in.

## Troubleshooting Common Issues

1. **Connection to MongoDB fails**:
   - Verify your MongoDB connection string in the `.env` file.
   - Check if MongoDB is running (if using a local installation).
   - Check network access settings (if using MongoDB Atlas).

2. **Backend server fails to start**:
   - Check for error messages in the console.
   - Verify that port 5000 is not being used by another application.
   - Ensure all required environment variables are set.

3. **Frontend fails to connect to backend**:
   - Verify the `VITE_API_URL` environment variable is correctly set.
   - Check if the backend server is running and accessible.

4. **Docker issues**:
   - Ensure Docker and Docker Compose are properly installed.
   - Check Docker logs using `docker-compose logs`.
