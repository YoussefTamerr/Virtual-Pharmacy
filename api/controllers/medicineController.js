import Medicine from "../models/medicineModel.js";
import { queryFilter } from "../utils/queryOptions.js";

const getAllMedicines = async (req, res) => {
  try {
    const dbQuery = queryFilter(Medicine.find(), req);
    const medicines = await dbQuery;
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

const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ name: req.body.name });
    if (medicine) {
      return res.status(400).json({ message: "Medicine already exists" });
    }
    const newMedicine = await Medicine.create(req.body);
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!medicine) {
      return res.status(400).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAllMedicines, getMedicine, createMedicine, updateMedicine };
