import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileRouter from "./routes/userRoutes.js";
import multer from "multer";
import cors from "cors";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 2020;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/profiles", profileRouter);

// Image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const BASE_IMAGE_URL = "https://profiles-management.onrender.com";
// upload endpoint
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("profile"), (req, res) => {
  const imageHost = BASE_IMAGE_URL || `${req.protocol}://${req.get("host")}`;
  res.json({
    success: 1,
    image_url: `${imageHost}/images/${req.file.filename}`,
  });
});

app.get("/", (req, res) => {
  res.send("Running successfully...");
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
