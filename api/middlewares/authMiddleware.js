import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";
import Pharmacist from "../models/pharmacistModel.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Please login to access this resource");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json("Please login to access this resource");
    }

    let currentUser = await Patient.findById(decoded.id).select("+password");
    currentUser ? (currentUser.role = "Patient") : null;
    if (!currentUser) {
      currentUser = await Pharmacist.findById(decoded.id).select("+password");
      currentUser ? (currentUser.role = "Pharmacist") : null;
      if (!currentUser) {
        currentUser = await Admin.findById(decoded.id).select("+password");
        currentUser ? (currentUser.role = "Admin") : null;
        if (!currentUser) {
          return res
            .status(403)
            .json(
              "Your account no longer exists, please login using a different account"
            );
        }
      }
    }
    req.user = currentUser;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};

export { verifyToken, restrictTo };
