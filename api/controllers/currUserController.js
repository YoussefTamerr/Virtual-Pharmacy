import Patient from "../models/patientModel.js";
import Pharmacist from "../models/pharmacistModel.js";

const getCurrUser = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (patient) res.status(200).json({ currUser: patient, role: "patient" });
    else {
      const pharmacist = await Pharmacist.findById(req.user._id);
      if (pharmacist)
        res.status(200).json({ currUser: pharmacist, role: "pharmacist" });
      else res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getCurrUser };
