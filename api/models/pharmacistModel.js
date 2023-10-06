import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const pharmacistSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    registrationApproval: {
      type: String,
      enum: ["pending", "denied", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model("Pharmacist", pharmacistSchema);
