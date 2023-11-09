import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const createAdmin = async (req, res) => {
  try {
    let existingAdmin = await Admin.findOne({ username: req.body.username });
    if (existingAdmin) {
      return res.status(400).json({ message: "username already exists" });
    }
    existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "email already exists" });
    }
    const newAdmin = await Admin.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = await admin.comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 });
    admin.password = undefined;
    return res.status(200).json({ token, data: admin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { createAdmin, loginAdmin };
