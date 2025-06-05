import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
