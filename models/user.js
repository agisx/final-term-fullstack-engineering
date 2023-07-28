// Import mongoose module
import mongoose from '../database.js';

// Define the schema for users collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  url_image_photo_profile: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
