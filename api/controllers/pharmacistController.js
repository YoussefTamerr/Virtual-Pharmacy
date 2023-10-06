import Pharmacist from "../models/pharmacistModel.js";
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

const getpharmacist = async(req, res) =>{
  try{
    const info = await Pharmacist.findById(req.params.id);
    if(!info){
      return res.status(400).json({message: "Pharmacist not found"});
    }
  }

  catch(err){
    res.status(400).json({ message: err.message });
  }
};

export { deletePharmacist, getpharmacist };
