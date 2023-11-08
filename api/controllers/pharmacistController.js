import Pharmacist from "../models/pharmacistModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

const loginPharmacist = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pharmacist = await Pharmacist.findOne({ username }).select(
      "+password"
    );
    if (!pharmacist) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await pharmacist.comparePassword(
      password,
      pharmacist.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (pharmacist.registrationApproval !== "approved") {
      return res.status(401).json({ message: "Account not approved yet" });
    }

    const token = jwt.sign({ id: pharmacist._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 });
    pharmacist.password = undefined;
    return res.status(200).json({ token, data: pharmacist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePharmacist = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Pharmacist ID" });
    }
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Pharmacist ID" });
    }
    const info = await Pharmacist.findById(req.params.id);
    if (!info) {
      return res.status(400).json({ message: "Pharmacist not found" });
    }
    res.status(201).json({ info });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find();
    res.status(200).json(pharmacists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const acceptPharmacist = async (req, res) => {
  try {
    const Pharmacist = await Pharmacist.findOne({
      username: req.body.username,
    });
    if (Pharmacist.registrationApproval === "pending") {
      Pharmacist.registrationApproval = "approved";
      await Pharmacist.save();
      res.status(201).json(Pharmacist);
    } else {
      return res
        .status(400)
        .json({ message: "Request already approved/denied" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const rejectPharmacist = async (req, res) => {
  try {
    const Pharmacist = await Pharmacist.findOne({
      username: req.body.username,
    });
    if (Pharmacist.registrationApproval === "pending") {
      Pharmacist.registrationApproval = "denied";
      await Pharmacist.save();
      res.status(201).json(Pharmacist);
    } else {
      return res
        .status(400)
        .json({ message: "Request already approved/denied" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  deletePharmacist,
  getPharmacist,
  createPharmacist,
  loginPharmacist,
  getAllPharmacists,
  acceptPharmacist,
  rejectPharmacist,
};
