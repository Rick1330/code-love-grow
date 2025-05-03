
# Task Manager Backend

The backend API service for the Task Manager application.

## Features

- User authentication with JWT
- Project management
- Task management
- Time tracking
- Achievement system
- User settings and profiles

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

## Setup Instructions

1. Clone the repository

2. Install dependencies
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the root directory (see `.env.example`)
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. For production
   ```
   npm start
   ```

## API Endpoints

The API is organized around the following resources:

- Auth: `/api/auth/*` - User authentication and authorization
- Users: `/api/users/*` - User profiles and settings
- Projects: `/api/projects/*` - Project management
- Tasks: `/api/tasks/*` - Task management
- Tracker: `/api/tracker/*` - Time tracking and statistics
- Achievements: `/api/achievements/*` - User achievements

For detailed API documentation, see the API documentation in the main project README.

## Database Models

The application uses the following MongoDB models:

- User: User accounts and authentication
- Project: Project management 
- Task: Task tracking
- Tracker: Daily time tracking entries
- Achievement: User achievements

## Development

- Use `npm run dev` for development with nodemon auto-reload
- All routes are in the `/routes` directory
- All database models are in the `/models` directory
- Middleware functions are in `/middleware` directory

## Testing

Run tests with:

```
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
