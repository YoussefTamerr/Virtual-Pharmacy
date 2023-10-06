import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  details: {
    activeIngredients: {
      type: String,
      required: true,
    },
  },
  picture: {
    type: String,
    required: true,
  },
});

export default model("Medicine", medicineSchema);
