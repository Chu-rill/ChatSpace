# ChatSpace

ChatSpace is a full-stack chat application built with React for the frontend and Express for the backend. It allows users to sign up, log in, send and receive messages, and manage their profiles.

## Features

- **User Authentication**: Sign up, log in, and log out.
- **Messaging**: Send and receive messages in real-time.
- **User Management**: View and update user profiles.

## Technologies Used

- **Frontend**: React, Zustand, React Router DOM, React Icons, React Hot Toast, DaisyUI
- **Backend**: Express, Socket.IO, Mongoose
- **Other**: bcryptjs, cookie-parser, cors, dotenv, jsonwebtoken, nodemon, socket.io-client

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ChatSpace

   ```

2. **Install backend dependencies**

   Navigate to the root folder and run:

   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   Navigate to the client folder and run:
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   From the root folder, run:

```bash
npm run server
```

2. **Start the frontend development server**
   From the client folder, run:

```bash
npm run dev
```

### Basic API Endpoints

API Endpoints

POST /api/auth/signup
Create a new user.

POST /api/auth/login
Log in a user.

POST /api/auth/logout/:id
Log out a user.

POST /api/msg/send/:id
Send a message to a user.

GET /api/msg/:id
Get messages for a user.

GET /api/users/
Get a list of all users.

PUT /api/users/update/:id
Update user profile.

### Configuration

Create a .env file in the root folder and add the following environment variables:

```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Contributing

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature-branch).

Create a new Pull Request.
