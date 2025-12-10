# E-Commerce Spring Boot Application

A full-stack e-commerce application built with Spring Boot (backend) and React (frontend).

## Project Structure

```
ecommerce_spring_boot/
├── backend/                      # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/            # Java source code
│   │   │   └── resources/       # Configuration files
│   │   └── test/                # Test files
│   ├── pom.xml                  # Maven dependencies
│   └── mvnw                      # Maven wrapper
│
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React Context (Cart)
│   │   └── App.js              # Main app component
│   ├── public/                 # Static assets
│   ├── package.json            # NPM dependencies
│   └── build/                  # Production build (git ignored)
│
└── README.md                    # This file
```

## Features

- **Product Management** - Browse and view products
- **Shopping Cart** - Add/remove items and manage quantities
- **Order Management** - Place orders
- **Inventory Management** - Automatic quantity reduction on purchase
- **Manager Panel** - Complete product and order management interface
- **RESTful API** - Complete REST API for all operations
- **Responsive UI** - Modern React frontend

## Tech Stack

### Backend
- Spring Boot 4.0.0
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- JavaScript (ES6+)
- CSS3

## Prerequisites

- Java 21+
- Node.js 14+
- PostgreSQL 12+
- Maven (or use mvnw/mvnw.cmd)

## Setup Instructions

### Backend Setup

1. **Database Configuration**
   - Update `src/main/resources/application.properties` with your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. **Build and Run**
   ```powershell
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```powershell
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```powershell
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders` - Get all orders

### Manager
- `POST /api/manager/login` - Manager authentication
- `GET /api/manager/products` - Get all products (manager view)
- `POST /api/manager/products` - Add new product
- `PUT /api/manager/products/{id}` - Update product details
- `DELETE /api/manager/products/{id}` - Delete product
- `GET /api/manager/orders` - View all customer orders

## Manager Panel

The application includes a complete manager dashboard for product and order management.

### Manager Login

- Click the **👨‍💼 Manager** button in the top-right navbar
- Enter credentials:
  - **Username**: `admin`
  - **Password**: `password123`

### Manager Dashboard Features

#### 1. **Manage Products Tab**
   - **View Products**: See all products in a table format with ID, name, price, and quantity
   - **Add New Product**: 
     - Click "+ Add New Product" button
     - Fill in product details:
       - Product Name
       - Description (detailed features)
       - Price (£)
       - Quantity (stock)
       - Image URL
     - Click "Add Product" to create
   - **Edit Product**:
     - Click the "Edit" button next to any product
     - Modify all product details
     - Click "Update Product" to save changes
   - **Delete Product**:
     - Click the "Delete" button next to any product
     - Confirm deletion in popup

#### 2. **View Orders Tab**
   - Displays all customer orders in a detailed table
   - Real-time view of all sales

## How It Works

1. **Browsing Products** - Users view available products with real-time inventory
2. **Shopping Cart** - Items are stored in React Context for session management
3. **Checkout** - Users fill shipping and payment information
4. **Order Placement** - Order is sent to backend API
5. **Inventory Update** - Product quantities are automatically reduced
6. **Order Confirmation** - Users receive order confirmation

## Development

### Database Schema

**Products Table**
- `id` - Primary key (auto-increment)
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `quantity` - Available stock
- `imageUrl` - Product image URL

**Orders Table**
- `id` - Primary key (auto-increment)
- `customerName` - Customer name
- `email` - Customer email
- `address` - Shipping address
- `city` - City
- `zipCode` - Zip code
- `cardLastFour` - Last 4 digits of card
- `itemsJson` - Order items (JSON)
- `totalAmount` - Order total
- `createdAt` - Order creation timestamp

