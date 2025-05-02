
# tssk-manager Backend API Documentation

This document outlines the API endpoints required for the tssk-manager application.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication

## API Base URL
`/api`

## Authentication Endpoints

### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

### Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

### Get Current User
- **URL:** `/auth/me`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
  ```

### Logout
- **URL:** `/auth/logout`
- **Method:** `POST`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

## Project Endpoints

### Get All Projects
- **URL:** `/projects`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  [
    {
      "id": "project_id",
      "title": "Project Title",
      "description": "Project Description",
      "status": "active",
      "progress": 25,
      "deadline": "2023-12-31T00:00:00.000Z",
      "tags": ["react", "node"],
      "tasks": [
        {
          "id": "task_id",
          "description": "Task description",
          "completed": false
        }
      ],
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

### Create Project
- **URL:** `/projects`
- **Method:** `POST`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "title": "Project Title",
    "description": "Project Description",
    "deadline": "2023-12-31",
    "tags": ["react", "node"]
  }
  ```
- **Response:**
  ```json
  {
    "id": "project_id",
    "title": "Project Title",
    "description": "Project Description",
    "status": "active",
    "progress": 0,
    "deadline": "2023-12-31T00:00:00.000Z",
    "tags": ["react", "node"],
    "tasks": [],
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### Update Project
- **URL:** `/projects/:id`
- **Method:** `PUT`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "status": "completed",
    "progress": 100
  }
  ```
- **Response:**
  ```json
  {
    "id": "project_id",
    "title": "Updated Title",
    "description": "Project Description",
    "status": "completed",
    "progress": 100,
    "deadline": "2023-12-31T00:00:00.000Z",
    "tags": ["react", "node"],
    "tasks": [],
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### Delete Project
- **URL:** `/projects/:id`
- **Method:** `DELETE`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "message": "Project deleted successfully"
  }
  ```

## Tracker Endpoints

### Get Tracker Entries
- **URL:** `/tracker`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Query Parameters:** `startDate`, `endDate`
- **Response:**
  ```json
  [
    {
      "id": "entry_id",
      "date": "2023-01-01T00:00:00.000Z",
      "hours": 4,
      "mood": 5,
      "languages": [
        { "name": "JavaScript", "hours": 2 },
        { "name": "TypeScript", "hours": 2 }
      ],
      "project": {
        "id": "project_id",
        "title": "Project Title"
      },
      "notes": "Worked on new features"
    }
  ]
  ```

### Add Tracker Entry
- **URL:** `/tracker`
- **Method:** `POST`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "date": "2023-01-01",
    "hours": 4,
    "mood": 5,
    "languages": [
      { "name": "JavaScript", "hours": 2 },
      { "name": "TypeScript", "hours": 2 }
    ],
    "project": "project_id",
    "notes": "Worked on new features"
  }
  ```
- **Response:**
  ```json
  {
    "id": "entry_id",
    "date": "2023-01-01T00:00:00.000Z",
    "hours": 4,
    "mood": 5,
    "languages": [
      { "name": "JavaScript", "hours": 2 },
      { "name": "TypeScript", "hours": 2 }
    ],
    "project": "project_id",
    "notes": "Worked on new features"
  }
  ```

### Get Tracker Statistics
- **URL:** `/tracker/stats`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "totalHours": 120,
    "languageStats": [
      { "_id": "JavaScript", "hours": 50 },
      { "_id": "TypeScript", "hours": 40 },
      { "_id": "React", "hours": 30 }
    ],
    "dailyAverage": [
      {
        "_id": "2023-01-01",
        "hours": 4.5,
        "mood": 4
      }
    ]
  }
  ```

### Get Streak Information
- **URL:** `/tracker/streak`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "currentStreak": 5,
    "maxStreak": 10
  }
  ```

## Achievement Endpoints

### Get User Achievements
- **URL:** `/achievements`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  [
    {
      "id": "achievement_id",
      "name": "First Day",
      "description": "Logged your first day of coding",
      "badgeIcon": "first-day-badge",
      "unlockedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

### Check Achievements
- **URL:** `/achievements/check`
- **Method:** `POST`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "newAchievements": [
      {
        "id": "achievement_id",
        "name": "7-Day Streak",
        "description": "Coded for 7 days in a row",
        "badgeIcon": "seven-day-streak",
        "unlockedAt": "2023-01-07T00:00:00.000Z"
      }
    ]
  }
  ```

## User Settings Endpoints

### Update User Profile
- **URL:** `/users/profile`
- **Method:** `PUT`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "name": "Updated Name",
    "avatar": "avatar_url"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user_id",
    "name": "Updated Name",
    "email": "user@example.com",
    "avatar": "avatar_url"
  }
  ```

### Update User Settings
- **URL:** `/users/settings`
- **Method:** `PUT`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "theme": "dark",
    "emailNotifications": true,
    "pushNotifications": false
  }
  ```
- **Response:**
  ```json
  {
    "id": "user_id",
    "settings": {
      "theme": "dark",
      "emailNotifications": true,
      "pushNotifications": false
    }
  }
  ```

## Tasks Endpoints

### Get All Tasks
- **URL:** `/tasks`
- **Method:** `GET`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  [
    {
      "id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending",
      "priority": "high",
      "dueDate": "2023-01-31T00:00:00.000Z",
      "project": {
        "id": "project_id",
        "title": "Project Title"
      },
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

### Create Task
- **URL:** `/tasks`
- **Method:** `POST`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "priority": "high",
    "dueDate": "2023-01-31",
    "project": "project_id"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "priority": "high",
    "dueDate": "2023-01-31T00:00:00.000Z",
    "project": "project_id",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### Update Task
- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Headers:** `x-auth-token: jwt_token`
- **Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response:**
  ```json
  {
    "id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "completed",
    "priority": "high",
    "dueDate": "2023-01-31T00:00:00.000Z",
    "project": "project_id",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### Delete Task
- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Headers:** `x-auth-token: jwt_token`
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## MongoDB Models

### User Model
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

### Project Model
```javascript
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  deadline: {
    type: Date
  },
  tags: [{
    type: String
  }],
  tasks: [{
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
```

### Task Model
```javascript
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Task', TaskSchema);
```

### Tracker Model
```javascript
const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hours: {
    type: Number,
    required: true,
    min: 0
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  languages: [{
    name: String,
    hours: Number
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  notes: {
    type: String
  }
});

// Index for efficient date queries
TrackerSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Tracker', TrackerSchema);
```

### Achievement Model
```javascript
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  badgeIcon: {
    type: String
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
```
