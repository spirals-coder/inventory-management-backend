const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Inventory Management API is running!',
    endpoints: {
      addProduct:        'POST   /products',
      getAllProducts:    'GET    /products',
      getProductById:   'GET    /products/:id',
      updateProduct:    'PUT    /products/:id',
      deleteProduct:    'DELETE /products/:id',
      searchByName:     'GET    /products/search?name=xyz',
      filterByCategory: 'GET    /products/category?cat=xyz'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/products', productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});