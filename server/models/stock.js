import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    });

export default mongoose.model("Stock", schema);
