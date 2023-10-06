import Pharmacist from "../models/pharmacistModel";
import mongoose from "mongoose";

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

export default { deletePharmacist };
