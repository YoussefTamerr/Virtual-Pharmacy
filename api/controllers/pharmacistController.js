import Pharmacist from "../models/pharmacistModel.js";
import mongoose from "mongoose";

const createPharmacist = async (req, res) => {
  try {
    const checkExisting = await Pharmacist.findOne({ email: req.body.email });
    if (checkExisting) {
      return res.status(400).json({ message: "email already exists" });
    }

    const pharmacist = await Pharmacist.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      hourlyRate: req.body.hourlyRate,
      affiliation: req.body.affiliation,
      educationalBackground: req.body.educationalBackground,
      registrationApproval: req.body.registrationApproval,
    });
    res.status(201).json({ pharmacist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
    if (!pharmacist) {
      return res
        .status(400)
        .json({ message: "No Pharmacist found with that ID" });
    }
    res.status(200).json({ message: "Pharmacist deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPharmacist = async (req, res) => {
  try {
    const info = await Pharmacist.findById(req.params.id);
    if (!info) {
      return res.status(400).json({ message: "Pharmacist not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { deletePharmacist, getPharmacist, createPharmacist };
