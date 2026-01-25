# 🛒 MERN E-Commerce Application

 **Project Status: In Progress**  
This project is actively being developed. Core architecture and data flow are implemented, with features being refined and expanded.

---

## Overview

A full-stack e-commerce web application built using the **MERN stack**, focusing on clean architecture, scalable API design, and real-world cart management logic.
This project is built to simulate real-world e-commerce behavior, focusing on authentication, cart persistence, and scalable frontend-backend communication.


---

## Key Features Implemented

### 🔐 Authentication & User Handling
- JWT-based user authentication
- User-specific data handling
- Secure API access control

### 🛒 Cart System
- User-specific cart stored in database
- Cart actions (add / update / remove) synced with DB
- Guest cart handled via localStorage
- Automatic cart persistence on login

### API Architecture
- Centralized API layer for all HTTP requests
- Reusable API functions for cleaner data flow
- Improved error handling and response management

### 🔍 Product Search
- Keyword-based product search
- Dedicated product listing page for search results

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Lottie React (animations)
- JavaScript
- Context API
- LocalStorage
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## 🗂️ Project Structure

The project follows a clear separation between backend and frontend with modular and scalable architecture.

### Backend (`/server`)
- `src/controllers/` – Business logic for auth, cart, products, orders
- `src/models/` – Mongoose schemas (User, Product, Cart, Order, Category)
- `src/routes/` – API route definitions
- `src/middleware/` – Auth protection and request guards
- `app.js / server.js` – Express app setup and server entry point
- `.env` – Environment variables (not committed)

### Frontend (`/client`)
- `src/api/` – Centralized HTTP request layer
- `src/context/` – Global state management (Auth, Cart)
- `src/hooks/` – Custom reusable hooks
- `src/components/` – Reusable UI components
- `src/pages/`
  - `auth/` – Login & Register pages
  - `admin/` – Admin dashboard and management pages
  - `public/` – Public-facing pages (Home, Product List, Product Details)
  - `user/` – User dashboard and settings
- `src/routes/` – Protected and role-based routing
- `main.jsx / App.jsx` – App bootstrap and routing


