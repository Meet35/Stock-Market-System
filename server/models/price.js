import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            unique: true,
            required: true,
        },
        date: { type: Number },
        open: { type: Number },
        high: { type: Number },
        low: { type: Number },
        close: { type: Number },
        volume: { type: Number },
    });

export default mongoose.model("Price", schema);

/*
import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            unique: true,
            required: true,
        },
        data: [{ date: Date, open: Number, high: Number, low: Number, close: Number, volume: Number }]
    });

export default mongoose.model("Price", schema);
*/