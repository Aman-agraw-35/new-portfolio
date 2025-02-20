import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000, // Increased timeout
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        connectTimeoutMS: 30000
      });
      console.log('MongoDB connected successfully');
      return;
    } catch (err) {
      console.error('MongoDB connection attempt failed:', err);
      retries -= 1;
      if (retries === 0) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Rating Schema
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default connectDB;