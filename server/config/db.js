import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://dipalim680:profile123@cluster0.qcynh6f.mongodb.net/";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("Error while connecting to DB");
  }
};

export default connectDB;
