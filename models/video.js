// Import mongoose module
import mongoose from '../database.js';

// Define the schema for videos collection
const videoSchema = new mongoose.Schema({
  url_image_thumbnail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['live', 'recorded', 'deleted'],
    default: 'recorded'
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
const Video = mongoose.model('Video', videoSchema);

// Export the model
export default Video;
