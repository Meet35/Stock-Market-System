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
        },
        lastprice: {
            type: Number,
        }
    });

export default mongoose.model("Stock", schema);
