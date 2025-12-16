# Xm-_bakeries — Inventory & Order Management API

A RESTful backend API built with **Node.js**, **Express**, **MySQL (mysql2)**, and **JWT authentication**. The system manages **Users**, **Products**, **Orders**, and **Inventory** with role-based access control.

---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 👥 User management (Admin, Librarian, Student)
- 📦 Product management (CRUD)
- 🛒 Order management
- 🏬 Inventory & stock control
- 🔍 Search, filter & sort products
- 🧩 Role-based access (`protect` & `restrictTo` middleware)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcryptjs
- ES Modules

---

## 📁 Project Structure

    project-root/
    │
    ├── controllers/
    │   ├── userControllers.js
    │   ├── productControllers.js
    │   ├── orderControllers.js
    │   └── inventoryControllers.js
    │
    ├── routes/
    │   ├── userRoutes.js
    │   ├── productRoutes.js
    │   ├── orderRoutes.js
    │   └── inventoryRoutes.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │
    ├── config/
    │   └── connect.js
    │
    ├── app.js
    ├── server.js
    ├── .env
    └── README.md

---

## 🔐 Authentication & Authorization

### Roles

- admin -- full access
- librarian -- manage products & inventory
- student -- view products & create orders

---

## 👥 Users

Method Endpoint Description

---

POST /api/users/signup Register
POST /api/users/login Login

---

## 📦 Products

Supports **search, filter, and sorting**.

Example:

    /api/products?search=phone&category=electronics&sortBy=price&order=asc

---

## 🛒 Orders

- Students create orders
- Admins manage orders
- Stock updates automatically

---

## 🏬 Inventory

- Tracks product quantity
- Low-stock alerts
- Restock and deduction endpoints

---

## ⚙️ Environment Variables

    PORT=8000
    NODE_ENV=development
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=inventory_db
    JWT_SECRET=your_jwt_secret

---

## ▶️ Running the Project

    npm install
    npm run dev

---

## 📌 Future Improvements

- Pagination
- Swagger documentation
- Transactions
- Refresh tokens

---

## 👨‍💻 Author

Backend project built with Node.js, Express & MySQL.

