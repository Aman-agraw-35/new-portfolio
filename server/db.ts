
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
