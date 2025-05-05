
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
   - Edit the `.env` file with your MongoDB connection string, JWT secret, and Google Client ID:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_jwt_secret_string
     NODE_ENV=development
     GOOGLE_CLIENT_ID=your_google_client_id
     ```

2. Frontend Environment Setup:
   - Create a `.env` file in the root directory:
     ```
     VITE_API_URL=http://localhost:5000/api
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```

3. Getting Google Client ID:
   - Go to the [Google Developer Console](https://console.developers.google.com/)
   - Create a new project or select an existing one
   - Go to "Credentials" and click "Create credentials" > "OAuth client ID"
   - Set the application type to "Web application"
   - Add authorized JavaScript origins (e.g., http://localhost:8080) and redirect URIs
   - Copy the Client ID and paste it in your .env files

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

2. Make sure your environment variables are set in your .env files or export them:
   ```
   export GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. From the root directory of the project, run:
   ```
   docker-compose up -d
   ```

4. This will start three containers:
   - MongoDB database
   - Backend API server
   - Frontend development server

5. Access the application at http://localhost:8080

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

4. **Google authentication issues**:
   - Ensure your Google Client ID is correctly set in both backend and frontend .env files.
   - Verify that your Google OAuth credentials have the correct authorized origins and redirect URIs.

5. **Docker issues**:
   - Ensure Docker and Docker Compose are properly installed.
   - Check Docker logs using `docker-compose logs`.
