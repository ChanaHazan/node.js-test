const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    stock: {
      min: 0,
      required: true,
      type: Number
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: { 
      type: Date, 
      default: Date.now
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.models.product || mongoose.model('product', productSchema);
