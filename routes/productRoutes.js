const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName,
  filterByCategory
} = require('../controllers/productController');

// IMPORTANT: specific routes must come before /:id
router.get('/search', searchProductByName);
router.get('/category', filterByCategory);

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
