import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongodb at : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to ${error.message}`);
  }
};

export default connectDB;
