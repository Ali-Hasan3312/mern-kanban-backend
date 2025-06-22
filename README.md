# MERN Kanban Todo App (Backend)

This is the **backend** for the Kanban-style Todo Web App, built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication, task management, file uploads (via Multer and Cloudinary), and secure session handling with JWT.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🧾 Session and cookie handling
- 🧠 MongoDB with Mongoose
- ☁️ Cloudinary file/image uploads
- 📦 REST API for tasks and users
- 🌐 CORS-enabled for frontend integration
- 🔍 Middleware for logging, parsing, and error handling

---

## 📦 Tech Stack

| Tool         | Purpose                                |
|--------------|----------------------------------------|
| Express      | Backend framework                      |
| MongoDB      | Database                               |
| Mongoose     | ODM for MongoDB                        |
| Cloudinary   | File and image storage                 |
| Multer       | File upload middleware                 |
| JWT          | User authentication                    |
| dotenv       | Manage environment variables           |
| bcrypt       | Password hashing                       |
| cors         | Cross-Origin Resource Sharing          |
| morgan       | Logging HTTP requests                  |
| supervisor   | Hot reloading during development       |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-kanban-backend.git
cd mern-kanban-backend

### 2. Install Dependencies
npm install

## 3. Environment Variables (.env)

Create a `.env` file in the root of the backend project with the following:

```env
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@cluster1.mongodb.net/kanban?retryWrites=true&w=majority&appName=Cluster1
PORT=3000

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CORS_ORIGIN=http://localhost:5173

### 4. ▶️ Run the Server

npm run dev

Your server will start on http://localhost:5000


