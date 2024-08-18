
# 📺 MERN Project Management App

EpisodeKeeper is a robust web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to store and manage their projects, with each project consisting of multiple episodes.

## 🌟 Features

- 🔐 Secure user authentication using JWT
- 📊 State management with Redux
- 📁 Create, read, update, and delete projects
- �Episode management within each project
- 🎨 Responsive and intuitive user interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB (v4.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/episodekeeper.git
   cd episodekeeper
   ```

2. Install dependencies for both server and client:
   ```
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## 🏗️ Project Structure

```
episodekeeper/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── redux/        # Redux actions
│   │   ├── components/     # React components
│   │   ├── reducers/       # Redux reducers
│   │   └── App.js          # Main React component
├── server/                 # Express backend
│   ├── controllers/        # Request handlers
│   │   └── userController.js
│   ├── middlewares/        # Custom middlewares
│   │   └── authMiddleware.js
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   │   └── userRoutes.js   # User-related routes
│   └── index.js           # Express app
├── .env                    # Environment variables
└── package.json            # Project dependencies and scripts
```

## 🛠️ Built With

- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework
- [React.js](https://reactjs.org/) - Frontend library
- [Node.js](https://nodejs.org/) - Runtime environment
- [Redux](https://redux.js.org/) - State management
- [JWT](https://jwt.io/) - Authentication

### API Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/` | POST | Register a new user | Public |
| `/auth` | POST | Login user | Public |
| `/logout` | POST | Logout current user | Public |
| `/profile` | GET | Get current user profile | Required |
| `/profile` | PUT | Update current user profile | Required |
| `/profile` | DELETE | Delete current user profile | Required |
| `/projects` | GET | Get all projects for current user | Required |
| `/projects` | POST | Create a new project | Required |
| `/projects/:projectId` | POST | Create a new episode in a project | Required |
| `/projects/:projectId` | GET | Get all episodes of a project | Required |
| `/projects/:projectId` | DELETE | Delete a project | Required |
| `/projects/:projectId/:episodeId` | GET | Get a specific episode | Required |
| `/projects/:projectId/:episodeId` | PUT | Update a specific episode | Required |
| `/projects/:projectId/:episodeId` | DELETE | Delete a specific episode | Required |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
