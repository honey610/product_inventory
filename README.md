Product Inventory Management System

Backend Developer (Intern) Assignment

A secure and scalable full-stack application demonstrating JWT authentication, role-based access control, and CRUD operations, with a supportive React frontend to interact with backend APIs.

📌 Project Overview

This project is built as part of the Backend Developer Intern assignment.
It focuses on designing a secure, scalable REST API with proper authentication and authorization, along with a basic frontend UI to demonstrate API usage.

The system supports:

User & Admin roles

Secure login & registration

Product management with image uploads

Admin role management

Protected dashboards

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT for authentication

bcrypt for password hashing

Multer + Cloudinary for image upload

Swagger for API documentation

Frontend

React.js

React Router

Axios

Custom Snackbar & Loading UI

✨ Core Features
🔐 Authentication & Authorization

User registration & login

Password hashing using bcrypt

JWT-based authentication

Role-based access control (USER, ADMIN)

Protected backend routes

👑 Admin Features

Create, update, delete products

Upload product images

Soft delete products

View all users

Change user roles (USER ↔ ADMIN)

Protected admin dashboard

👤 User Features

Login & registration

View available products

Access protected user dashboard

🧱 Backend Architecture

RESTful API design

API versioning (/api/v1)

Centralized error handling

Input validation

Secure token handling

Scalable folder structure

📂 Project Structure
Product Inventory/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.jsx
│
└── README.md
⚙️ Setup Instructions
🔹 Backend Setup
cd backend
npm install

Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run backend:

npm run dev
🔹 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:5000
🔗 API Endpoints (Sample)
Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

Products

GET /api/v1/products

POST /api/v1/products (Admin)

PUT /api/v1/products/:id (Admin)

DELETE /api/v1/products/:id (Admin)

Admin

GET /api/v1/admin/users

PUT /api/v1/admin/users/:id/role

📖 API Documentation

Swagger documentation is available at:

http://localhost:5000/api-docs
