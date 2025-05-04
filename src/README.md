
# Task Manager Frontend

This directory contains the frontend code for the Task Manager application, built with React, TypeScript, and Tailwind CSS.

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/            # Authentication related components
│   ├── layout/          # Layout components (Navbar, Sidebar)
│   ├── notifications/   # Notification components
│   ├── tracker/         # Time tracking components
│   └── ui/              # UI components (buttons, inputs, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── pages/               # Page components
├── services/            # API service functions
└── App.tsx              # Main application component
```

## Component Patterns

The application follows these component patterns:

1. **Page Components**: High-level components that represent entire pages/routes
2. **Feature Components**: Components tied to specific features (e.g., `TrackerHeader`)
3. **Layout Components**: Components that define the layout of the application (e.g., `Navbar`, `Sidebar`)
4. **UI Components**: Reusable UI components (buttons, inputs, etc.)

## State Management

The application uses several state management approaches:

1. **React Context**: For global states like authentication (`useAuth` hook)
2. **TanStack Query**: For server state management and data fetching
3. **Local Component State**: For component-specific UI state

## Authentication Flow

1. User signs up or logs in via the auth forms
2. JWT token is stored in localStorage
3. API requests include the token in headers
4. Protected routes check auth state via `useAuth` hook
5. Unauthorized users are redirected to login

## Styling

The application uses Tailwind CSS for styling with a custom color scheme:

- Primary: `lovable-purple`
- Secondary: `lovable-gray`

The UI components are built on top of shadcn/ui, which provides accessible and customizable components.

## Best Practices

1. Use TypeScript for type safety
2. Keep components small and focused
3. Use custom hooks to abstract complex logic
4. Follow consistent naming conventions
5. Implement proper error handling

## Development Workflow

1. Make changes to components
2. Test in development server
3. Fix any TypeScript or linting errors
4. Ensure UI is responsive for all screen sizes

