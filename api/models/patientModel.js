import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const patientSchema = new Schema(
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
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emergencyContact: {
      fullName: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default model("Patient", patientSchema);
