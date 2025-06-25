# MERN Real-Time Chat Application

A full-stack real-time chat application built with MongoDB, Express.js, React, Node.js, and Socket.io.

Features.....

- **Real-time messaging** with Socket.io
- **Image sharing** with base64 encoding
- **Dark/Light theme** toggle with localStorage persistence
- **Responsive design** for mobile and desktop
- **User selection** with hardcoded users
- **Message history** persistence in MongoDB

Tech Stack....
 Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Socket.io-client for real-time communication
- Custom hooks for theme and socket management

 Backend.....
- Node.js with Express.js
- Socket.io for real-time communication
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mern-chat-app
```

### 2. Install Dependencies

Install both server and client dependencies:

bash
# Install server dependencies
npm install

# Install client dependencies (automatically runs via postinstall script)
# Or manually run: npm run install-client


### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/chatapp
CLIENT_URL=http://localhost:3000
NODE_ENV=development
PORT=3010
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
CLIENT_URL=http://localhost:3000
NODE_ENV=development
PORT=3010
``

 MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3010`
- Frontend React app on `http://localhost:3000`





