import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/portfolio';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
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