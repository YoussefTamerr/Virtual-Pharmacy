import { Schema as _Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
      select: false,
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

patientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

patientSchema.methods.comparePassword = async function (
  enteredPassword,
  hashedPassword
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

patientSchema.virtual("cart", {
  ref: "Cart",
  foreignField: "patient_id",
  localField: "_id",
});

export default model("Patient", patientSchema);
