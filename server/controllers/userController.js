import express from "express";
import userModel from "../models/userModel.js";

const addProfile = async (req, res) => {
  try {
    const profile = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role,
      image: req.body.image,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
    });

    await profile.save();
    res.status(201).json({
      message: "Profile created successfuly",
    });
  } catch (error) {
    res.status(500).send("Error while creating the profile");
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await userModel.find();

    res.status(200).json({
      profiles,
    });
  } catch (error) {
    res.status(500).send("Error while getting the profiles");
  }
};

export { addProfile, getProfiles };
