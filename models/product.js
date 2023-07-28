// Import mongoose module
import mongoose from '../database.js';

// Define the schema for products collection
const productSchema = new mongoose.Schema({
  url_product: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the model
export default Product;
