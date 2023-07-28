// Import mongoose module
import mongoose from '../database.js';

// Define the schema for comments collection
const commentSchema = new mongoose.Schema({
  video_id: {
    type: String,
    ref: 'Video',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Create a model from the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the model
export default Comment;
