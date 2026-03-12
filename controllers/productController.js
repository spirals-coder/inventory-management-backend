const Product = require('../models/Product');

// @desc    Add a new product
// @route   POST /products
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next(new Error('Product Code already exists'));
    }
    next(error);
  }
};

// @desc    Get all products
// @route   GET /products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search product by name
// @route   GET /products/search?name=xyz
const searchProductByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400);
      return next(new Error('Please provide a name to search'));
    }
    const products = await Product.find({
      productName: { $regex: name, $options: 'i' }
    });
    if (products.length === 0) {
      res.status(404);
      return next(new Error('No products found with that name'));
    }
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Filter products by category
// @route   GET /products/category?cat=xyz
const filterByCategory = async (req, res, next) => {
  try {
    const { cat } = req.query;
    if (!cat) {
      res.status(400);
      return next(new Error('Please provide a category to filter'));
    }
    const products = await Product.find({
      category: { $regex: cat, $options: 'i' }
    });
    if (products.length === 0) {
      res.status(404);
      return next(new Error('No products found in that category'));
    }
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName,
  filterByCategory
};
