import Patient from "../models/patientModel.js";
import mongoose from "mongoose";

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

const deletePatient = async (req, res) => {
  try {
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

export { deletePatient, getPatient, createPatient, getAllPatients };
