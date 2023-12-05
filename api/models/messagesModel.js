import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const messageSchema = new Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },

},
{
    timestamps: true,
}
);

export default model("Message", messageSchema);