
const productSchema = new mongoose.Schema(
  {
    title: {
      trim: true
    },
    price: {
      min: 0
    },
    stock: {
      min: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true 
  }
);
