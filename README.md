# Inventory Management Backend API

A RESTful backend API for managing retail store inventory built with Node.js, Express.js, and MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv

## Setup Instructions

1. Clone the repository
```
git clone https://github.com/YOUR_USERNAME/inventory-management-backend.git
cd inventory-management-backend
```

2. Install dependencies
```
npm install
```

3. Create `.env` file and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

4. Run the server
```
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /products | Add a new product |
| GET | /products | Get all products |
| GET | /products/:id | Get product by ID |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| GET | /products/search?name=xyz | Search by name |
| GET | /products/category?cat=xyz | Filter by category |

## Sample Product JSON
```json
{
  "productName": "Samsung TV",
  "productCode": "PROD001",
  "category": "Electronics",
  "supplierName": "Samsung India",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 45000,
  "manufactureDate": "2024-01-01",
  "productType": "Non-Perishable",
  "status": "Available"
}
```

## Deployment
- GitHub: https://github.com/YOUR_USERNAME/inventory-management-backend
- Render: https://inventory-management-backend.onrender.com
