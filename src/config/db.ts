import mongoose from "mongoose";

async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected !");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit();
  }
}

export default connectDB;
