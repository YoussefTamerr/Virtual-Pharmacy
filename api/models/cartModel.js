import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const cartSchema = new Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
      },

    list: [
        {
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
          },
          quantity: Number,
        },
      ]
});
export default model("Cart", cartSchema);