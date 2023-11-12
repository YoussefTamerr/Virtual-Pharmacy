import jwt from "jsonwebtoken";
import Email from "../utils/email.js";
import Admin from "../models/adminModel.js";
import Patient from "../models/patientModel.js";
import Pharmacist from "../models/pharmacistModel.js";

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    let user = req.user;
    if (!user) {
      const userId = req.params.id;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "Please login to access this resource" });
      }
      const decoded = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET + userId
      );

      if (decoded.role == "admin") {
        user = await Admin.findById(decoded.id).select("+password");
      } else if (decoded.role == "patient") {
        user = await Patient.findById(decoded.id).select("+password");
      } else if (decoded.role == "pharmacist") {
        user = await Pharmacist.findById(decoded.id).select("+password");
      }
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const requestResetPassword = async (req, res) => {
  try {
    const { email, role } = req.body;
    let user;

    if (role === "admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "patient") {
      user = await Patient.findOne({ email }).select("+password");
    } else if (role === "pharmacist") {
      user = await Pharmacist.findOne({ email }).select("+password");
    }

    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    const resetToken = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET + user._id,
      {
        expiresIn: "10m",
      }
    );

    const resetURL = `${process.env.CLIENT_URL}/change-password/${user._id}/${resetToken}/`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      message: "Reset password link has been sent to your email",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { logout, changePassword, requestResetPassword };
