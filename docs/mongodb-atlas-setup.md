
# MongoDB Atlas Setup Guide

This document provides step-by-step instructions for setting up MongoDB Atlas for the Task Manager application.

## Creating a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and click "Try Free" to create a new account or sign in with an existing account.

2. Complete the registration process if you're a new user.

## Creating a Cluster

1. Once logged in, click on "Build a Database".

2. Choose the "FREE" tier option (M0 Sandbox).

3. Select your preferred cloud provider (AWS, Google Cloud, or Azure) and a region closest to your users for optimal performance.

4. Click "Create Cluster". This might take a few minutes to complete.

## Setting Up Database Access

1. In the left sidebar, click on "Database Access" under the Security section.

2. Click the "Add New Database User" button.

3. Create a user with a secure password. Make sure to remember these credentials as they will be needed for your application.
   - Authentication Method: Password
   - Username: [Your Username]
   - Password: [Your Secure Password]

4. Under "Database User Privileges", select "Atlas admin" for development purposes (you can restrict permissions further in production).

5. Click "Add User".

## Setting Up Network Access

1. In the left sidebar, click on "Network Access" under the Security section.

2. Click the "Add IP Address" button.

3. For development purposes, you can choose "Allow Access from Anywhere" (0.0.0.0/0). For production, restrict this to specific IP addresses.

4. Click "Confirm".

## Getting Your Connection String

1. Go back to the Clusters page by clicking "Database" in the left sidebar.

2. Click the "Connect" button on your cluster.

3. Select "Connect your application".

4. Choose your driver version (Node.js and the latest version).

5. Copy the provided connection string. It will look something like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

6. Replace `<username>` and `<password>` with your database user credentials created earlier.

7. Replace `<dbname>` with your preferred database name (e.g., `task-manager`).

## Configuring Your Application

1. Update your `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
   ```

2. Make sure to replace `<username>`, `<password>`, and the cluster-specific part with your actual values.

## Testing the Connection

1. Start your backend application.

2. If the connection is successful, you should see a message in your console indicating that MongoDB is connected.

## Troubleshooting

- If you encounter connection issues, check that:
  - Your username and password are correct in the connection string
  - Your IP address has been whitelisted in the Network Access settings
  - The cluster is up and running

- For "Authentication failed" errors, verify your database user credentials.

- For "Network Error" issues, check your Network Access settings to ensure your current IP is allowed.
