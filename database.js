
import "dotenv/config.js";

// Import mongoose module
import mongoose from 'mongoose';

// Define the database URL
const dbURL = `${process.env.MONGO_HOST}`;

// Connect to the database using mongoose
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${process.env.DATABASE_NAME}`))
  .catch(err => console.error(err + ` ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`));

// Export the mongoose module
export default mongoose;
