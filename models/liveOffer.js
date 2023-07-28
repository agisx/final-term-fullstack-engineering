// Import the mongoose module from db.js
import mongoose from '../database.js';

// Define the schema for live_offers collection
const liveOfferSchema = new mongoose.Schema({
  video_id: {
    type: String,
    ref: 'Video',
    required: true
  },
  product_id: {
    type: String,
    ref: 'Product',
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
const LiveOffer = mongoose.model('Live_Offer', liveOfferSchema);

// Export the model
export default LiveOffer;
