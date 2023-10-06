import Admin from "../models/adminModel.js";
import mongoose from "mongoose";

const createAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ username: req.body.username });
    if (existingAdmin) {
      return res.status(400).json({ message: "username already exists" });
    }
    const newAdmin = await Admin.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { createAdmin };
