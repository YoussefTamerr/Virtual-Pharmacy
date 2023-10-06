import Medicine from "../models/medicineModel.js";
import mongoose from "mongoose";

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res
        .status(400)
        .json({ message: "No Medicine found with that ID" });
    }
    res.status(200).json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAllMedicines, getMedicine };
