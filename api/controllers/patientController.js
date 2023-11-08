import Patient from "../models/patientModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const createPatient = async (req, res) => {
  try {
    const checkExisting = await Patient.findOne({ email: req.body.email });
    if (checkExisting) {
      return res.status(400).json({ message: "email already exists" });
    }
    const patient = await Patient.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
      emergencyContact: req.body.emergencyContact,
    });
    res.status(201).json({ patient });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { username, password } = req.body;
    const patient = await Patient.findOne({ username }).select("+password");
    if (!patient) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = await patient.comparePassword(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 });
    patient.password = undefined;
    return res.status(200).json({ token, data: patient });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(400).json({ message: "No Patient found with that ID" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPatient = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }
    const info = await Patient.findById(req.params.id);
    if (!info) {
      return res.status(400).json({ message: "Patient not found" });
    }
    res.status(201).json({ info });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  deletePatient,
  getPatient,
  createPatient,
  getAllPatients,
  loginPatient,
};
