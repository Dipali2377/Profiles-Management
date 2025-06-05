import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileRouter from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 2020;
const app = express();
app.use(express.json());
app.use("/profiles", profileRouter);
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
