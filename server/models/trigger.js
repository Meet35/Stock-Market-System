import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
        },
        name: { type: String },
        strikeupperprice: { type: Number },
        strikelowerprice: { type: Number },
        date: {
            type: Date,
            default: Date.now,
        },
        email: {
            type: String,
            required: true,
        },
        userid: {
            type: String,
            required: true,
        }
    });

export default mongoose.model("Trigger", schema);