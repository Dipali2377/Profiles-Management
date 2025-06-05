import express from "express";
import { addProfile, getProfiles } from "../controllers/userController.js";

const profileRouter = express.Router();

profileRouter.post("/addprofile", addProfile);
profileRouter.get("/allprofiles", getProfiles);

export default profileRouter;
