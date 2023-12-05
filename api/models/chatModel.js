import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const chatSchema = new Schema({
    members: {
        type: Array,
        
    },
    membersInfo: {
        type: Array,
    },
},
    {
        timestamps: true,
    }
);

export default model("Chat", chatSchema);