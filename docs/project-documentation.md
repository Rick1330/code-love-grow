
# Task Manager Documentation

## Project Overview

Task Manager is a comprehensive web application designed to help users manage their projects and tasks, track their time, and earn achievements for consistent progress. It features a responsive user interface built with React and TypeScript on the frontend, with a Node.js/Express backend connected to a MongoDB database.

## Table of Contents

1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Component Structure](#component-structure)
4. [API Documentation](#api-documentation)
5. [Authentication](#authentication)
6. [Database Models](#database-models)
7. [Development Setup](#development-setup)
8. [Docker Setup](#docker-setup)

## Architecture

The Task Manager follows a typical three-tier architecture:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  React UI   │ <──> │ Express API │ <──> │  MongoDB    │
│  (Frontend) │      │ (Backend)   │      │ (Database)  │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

- **Presentation Layer**: React frontend with TypeScript and Tailwind CSS
- **Application Layer**: Express/Node.js REST API
- **Data Layer**: MongoDB database with Mongoose ODM

## Technology Stack

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
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

### Development Tools
- Vite for frontend development
- Nodemon for backend auto-reload
- Docker for containerization

## Component Structure

### Frontend Structure

```
src/
├── components/
│   ├── auth/           // Authentication components
│   ├── layout/         // Layout components
│   ├── notifications/  // Notification components
│   ├── tracker/        // Time tracking components
│   └── ui/             // UI components
├── hooks/              // Custom React hooks
├── lib/                // Utility functions
├── pages/              // Page components
└── services/           // API services
```

### Backend Structure

```
backend/
├── config/             // Configuration files
├── middleware/         // Express middleware
├── models/             // Mongoose models
├── routes/             // API routes
└── server.js           // Main entry point
```

## API Documentation

The Task Manager API is RESTful and follows standard HTTP methods:

### Authentication Endpoints
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out the current user
- `GET /api/auth/me`: Get the current user

### User Endpoints
- `GET /api/users`: Get all users (admin only)
- `GET /api/users/:id`: Get a specific user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user

### Project Endpoints
- `GET /api/projects`: Get all projects for the current user
- `GET /api/projects/:id`: Get a specific project
- `POST /api/projects`: Create a new project
- `PUT /api/projects/:id`: Update a project
- `DELETE /api/projects/:id`: Delete a project

### Task Endpoints
- `GET /api/tasks`: Get all tasks for the current user
- `GET /api/tasks/:id`: Get a specific task
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

### Tracker Endpoints
- `GET /api/tracker`: Get all time tracking entries
- `GET /api/tracker/:date`: Get entries for a specific date
- `POST /api/tracker`: Create a new time tracking entry
- `PUT /api/tracker/:id`: Update a time tracking entry
- `DELETE /api/tracker/:id`: Delete a time tracking entry

### Achievement Endpoints
- `GET /api/achievements`: Get all achievements for the current user
- `GET /api/achievements/:id`: Get a specific achievement

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in localStorage on the client side and included in the Authorization header for API requests.

Authentication flow:
1. User registers or logs in
2. Backend generates a JWT token
3. Token is stored in localStorage
4. Token is included in subsequent API requests
5. Protected routes check for valid token

## Database Models

### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed)
- `created`: Date
- `settings`: Object

### Project Model
- `title`: String (required)
- `description`: String
- `status`: String (enum)
- `deadline`: Date
- `user`: ObjectId (reference to User)
- `created`: Date

### Task Model
- `title`: String (required)
- `description`: String
- `status`: String (enum)
- `priority`: String (enum)
- `dueDate`: Date
- `project`: ObjectId (reference to Project)
- `user`: ObjectId (reference to User)
- `created`: Date

### Tracker Model
- `date`: Date (required)
- `hours`: Number (required)
- `description`: String
- `project`: ObjectId (reference to Project)
- `language`: String
- `mood`: Number
- `user`: ObjectId (reference to User)

### Achievement Model
- `name`: String (required)
- `description`: String (required)
- `unlocked`: Boolean
- `unlockedAt`: Date
- `icon`: String
- `user`: ObjectId (reference to User)

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (installed locally or MongoDB Atlas)
- npm or yarn package manager

### Local Setup

1. Clone the repository
2. Set up the backend:
   ```
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. Set up the frontend:
   ```
   npm install
   npm run dev
   ```

### Environment Variables

**Backend (.env file)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Docker Setup

The application is containerized using Docker, allowing for consistent development and deployment environments.

### Prerequisites
- Docker
- Docker Compose

### Running with Docker

1. Make sure Docker is running on your system
2. Run the following command from the root directory:
   ```
   docker-compose up
   ```
3. To run in detached mode (background):
   ```
   docker-compose up -d
   ```
4. Access the application:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

### Docker Services

- **mongodb**: MongoDB database
- **backend**: Node.js/Express API
- **frontend**: React application

### Working with Docker

- View running containers:
  ```
  docker ps
  ```
- View logs:
  ```
  docker-compose logs -f [service_name]
  ```
- Stop containers:
  ```
  docker-compose down
  ```
- Rebuild containers after changes:
  ```
  docker-compose up --build
  ```
