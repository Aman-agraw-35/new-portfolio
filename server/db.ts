import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI ='mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // ✅ Removed deprecated options

    console.log('✅ MongoDB Connected Successfully');

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
