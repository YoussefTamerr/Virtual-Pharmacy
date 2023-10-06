import Patient from "../models/patientModel.js";
import mongoose from "mongoose";

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

export { deletePatient };
