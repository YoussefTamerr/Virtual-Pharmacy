import Admin from "../models/adminModel.js";
import Pharmacist from "../models/pharmacistModel.js";
import jwt from "jsonwebtoken";

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
    res.cookie("token", token, { httpOnly: true });
    admin.password = undefined;
    return res.status(200).json({ token, data: admin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const acceptPharmacist = async(req, res) => {
  try{
    const pharmacist = await Pharmacist.findOne({username: req.body.username});
    res.status(201).json(pharmacist);
  }
  catch(err){
    res.status(400).json({ message: err.message });
  }
};

const rejectPharmacist = async(req, res) => {
  try{
    const pharmacist = await Pharmacist.findOne({username: req.body.username});
    res.status(201).json(pharmacist);
  }
  catch(err){
    res.status(400).json({ message: err.message });
  }
};

export { createAdmin, loginAdmin, acceptPharmacist,rejectPharmacist};
