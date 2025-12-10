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

