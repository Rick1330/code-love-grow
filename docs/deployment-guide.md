
# Deployment Guide for Task Manager

This guide outlines the steps to deploy the Task Manager application to various environments.

## Table of Contents

1. [Deployment Options](#deployment-options)
2. [Docker Deployment](#docker-deployment)
3. [Manual Deployment](#manual-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [SSL Setup](#ssl-setup)
7. [CI/CD Integration](#cicd-integration)
8. [Post-Deployment Steps](#post-deployment-steps)

## Deployment Options

The Task Manager application can be deployed using several methods:

1. **Docker Deployment**: Using Docker and Docker Compose
2. **Manual Deployment**: Setting up and running the application components separately
3. **Cloud Services**: Using platforms like Heroku, Vercel, AWS, etc.

## Docker Deployment

Docker provides the easiest way to deploy the entire stack with minimal configuration.

### Prerequisites

- Docker Engine
- Docker Compose
- A server or cloud instance with sufficient resources

### Steps

1. Clone the repository to your deployment environment:
   ```
   git clone [repository_url]
   cd task-manager
   ```

2. Create production environment files:
   ```
   # Frontend environment variables
   cp .env.example .env

   # Backend environment variables
   cd backend
   cp .env.example .env.production
   cd ..
   ```

3. Update the environment variables in both .env files:
   - Set `NODE_ENV=production`
   - Update MongoDB connection URI for production
   - Set a secure JWT secret
   - Update API URLs to match your domain

4. Modify the docker-compose.yml file (if needed) to use your production settings:
   ```yaml
   # Example changes
   backend:
     environment:
       - NODE_ENV=production
       - MONGO_URI=mongodb://mongodb:27017/task-manager
       - JWT_SECRET=your_secure_production_secret
   
   frontend:
     environment:
       - VITE_API_URL=https://api.your-domain.com/api
   ```

5. Build and start the containers:
   ```
   docker-compose -f docker-compose.yml up -d --build
   ```

6. Set up a reverse proxy with Nginx or use a load balancer to route traffic to your Docker containers.

### Updating the Application

To update your deployed application:

1. Pull the latest code:
   ```
   git pull origin main
   ```

2. Rebuild and restart the containers:
   ```
   docker-compose -f docker-compose.yml up -d --build
   ```

## Manual Deployment

If you prefer not to use Docker, you can deploy the application manually.

### Backend Deployment

1. Set up a Node.js environment (v16+) on your server
2. Clone the repository
3. Navigate to the backend folder:
   ```
   cd backend
   ```
4. Install production dependencies:
   ```
   npm install --production
   ```
5. Create and configure the .env file
6. Start the backend server:
   ```
   # Using PM2 (recommended for production)
   pm2 start server.js --name task-manager-backend
   
   # Or using plain Node
   NODE_ENV=production node server.js
   ```

### Frontend Deployment

1. Build the frontend for production:
   ```
   npm run build
   ```
2. Deploy the `dist` directory to your web server or static hosting service
3. Configure your web server (Nginx, Apache, etc.) to serve the static files

## Environment Configuration

### Production Environment Variables

**Backend (.env)**
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://your-production-mongodb-uri
JWT_SECRET=your-secure-production-secret
```

**Frontend (.env)**
```
VITE_API_URL=https://api.your-domain.com/api
```

### CORS Configuration

Update the CORS settings in the backend's `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## Database Setup

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Set up a new cluster
3. Create a database user with appropriate permissions
4. Whitelist your server's IP address
5. Get the connection string and update your backend .env file

### Local MongoDB Setup

If you're running MongoDB on your own server:

1. Install MongoDB
2. Create a database for the application
3. Set up authentication
4. Configure backup strategies

## SSL Setup

### Let's Encrypt SSL Certificate

1. Install Certbot on your server
2. Obtain SSL certificates:
   ```
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```
3. Set up auto-renewal:
   ```
   sudo certbot renew --dry-run
   ```

### Using Nginx as SSL Termination

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$host$request_uri;
}
```

## CI/CD Integration

### GitHub Actions Example

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy Task Manager

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      
      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push Docker images
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: yourusername/task-manager:latest
      
      - name: Deploy to production server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /path/to/app
            git pull
            docker-compose -f docker-compose.yml pull
            docker-compose -f docker-compose.yml up -d
```

## Post-Deployment Steps

1. **Set up monitoring**:
   - Server monitoring with tools like Prometheus + Grafana
   - Application monitoring with Sentry, New Relic, etc.
   - Uptime monitoring with UptimeRobot, Pingdom, etc.

2. **Configure backups**:
   - Database backups (automated)
   - Container backups (if using Docker)
   - Code repository backups

3. **Security checks**:
   - Run security audits
   - Set up a security scanning service
   - Configure rate limiting and brute force protection

4. **Performance optimization**:
   - Enable compression
   - Set up proper caching
   - Configure CDN for static assets
