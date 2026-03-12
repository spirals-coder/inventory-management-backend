const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      trim: true
    },
    productName: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true
    },
    productCode: {
      type: String,
      required: [true, 'Product Code is required'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Sports', 'Beauty', 'Other']
    },
    supplierName: {
      type: String,
      required: [true, 'Supplier Name is required'],
      trim: true
    },
    quantityInStock: {
      type: Number,
      required: [true, 'Quantity in Stock is required'],
      min: [0, 'Quantity must be a non-negative number']
    },
    reorderLevel: {
      type: Number,
      required: [true, 'Reorder Level is required'],
      min: [1, 'Reorder Level must be greater than 0']
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit Price is required'],
      min: [0.01, 'Unit Price must be a positive value']
    },
    manufactureDate: {
      type: Date,
      required: [true, 'Manufacture Date is required']
    },
    productType: {
      type: String,
      required: [true, 'Product Type is required'],
      enum: ['Perishable', 'Non-Perishable']
    },
    status: {
      type: String,
      enum: ['Available', 'Out of Stock'],
      default: 'Available'
    }
  },
  { timestamps: true }
);

// Auto-generate productId before saving
productSchema.pre('save', async function (next) {
  if (!this.productId) {
    const count = await mongoose.model('Product').countDocuments();
    this.productId = 'PROD' + String(count + 1).padStart(4, '0');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
