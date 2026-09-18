# NovaCart - Multi-Vendor E-Commerce Platform

NovaCart is a full-stack multi-vendor e-commerce platform that allows customers to browse products, add products to their cart, place orders, and track their orders. Vendors can manage their products and orders, while administrators can manage users, products, and orders.

## Technologies Used

### Frontend

* React.js
* Vite
* Bootstrap
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Main Features

* User Registration and Login
* Customer, Vendor, and Admin Roles
* Product Management
* Product CRUD Operations
* Shopping Cart
* Checkout
* Customer Order Management
* Vendor Dashboard
* Vendor Order Management
* Admin Dashboard
* User Management
* Product Management
* Order Status Management
* MongoDB Database
* JWT Authentication
* Responsive and Modern UI

## Project Structure

```text
NovaCart-MultiVendor-ECommerce/
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

## How to Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

## Database

NovaCart uses MongoDB with Mongoose for storing:

* Users
* Products
* Carts
* Orders

## Authentication

JWT-based authentication is used to protect user accounts and role-based features.

## User Roles

### Customer

* Browse products
* Add products to cart
* Checkout
* View orders

### Vendor

* Add products
* Update products
* Delete products
* View vendor orders
* Update order status

### Admin

* View users
* View products
* View orders
* Manage order status
* View marketplace statistics

## Project Purpose

This project was developed as a full-stack e-commerce application demonstrating frontend development, backend API development, database management, authentication, authorization, CRUD operations, and role-based access control.
