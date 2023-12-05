import Patient from "../models/patientModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const createPatient = async (req, res) => {
  try {
    const checkExisting = await Patient.findOne({ email: req.body.email });
    if (checkExisting) {
      return res.status(400).json({ message: "email already exists" });
    }
    const checkExistingUsername = await Patient.findOne({ username: req.body.username });
    if (checkExistingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }
    const checkExistingNid = await Patient.findOne({ nid: req.body.nid });
    if (checkExistingNid) {
      return res.status(400).json({ message: "nid already exists" });
    }

    let linkingCode

    do {
        linkingCode = crypto.randomBytes(16).toString('hex')
    } while (await Patient.findOne({ linkingCode }))

    const patient = await Patient.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      gender: req.body.gender,
      nid: req.body.nid,
      phoneNumber: req.body.phoneNumber,
      emergencyName: req.body.emergencyName,
      emergencyPhoneNumber: req.body.emergencyPhoneNumber,
      emergencyRelation: req.body.emergencyRelation,
      linkingCode: linkingCode,
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
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
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

const addDeliveryAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }
    if(patient.deliveryAddress.length === 0){
      req.body.is_default = true;
    }
    patient.deliveryAddress.push(req.body);
    await patient.save();
    res.status(201).json({ patient });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const chooseDefaultAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }

    // const addressIndex = req.body.index;
    // if (addressIndex < 0 || addressIndex >= patient.deliveryAddress.length) {
    //   return res.status(400).json({ message: "Invalid address index" });
    // }

    // patient.deliveryAddress.forEach((address, index) => {
    //   if (index === addressIndex) {
    //     address.is_default = true;
    //   } else {
    //     address.is_default = false;
    //   }
    // });
    
    patient.deliveryAddress.forEach((address) => {
      if (address.street_address+', '+address.city+', '+ address.governate === req.body.address) {
        address.is_default = true;
      } else {
        address.is_default = false;
      }
    });
    await patient.save();
    res.status(201).json({ patient });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const getDeliveryAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }
    res.status(201).json({ patient });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const getLoggedInPatient = async(req, res) =>{
  try{
    const patient =await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }
    res.status(201).json(patient);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export {
  deletePatient,
  getPatient,
  createPatient,
  getAllPatients,
  loginPatient,
  addDeliveryAddress,
  chooseDefaultAddress,
  getDeliveryAddress,
  getLoggedInPatient,
};
