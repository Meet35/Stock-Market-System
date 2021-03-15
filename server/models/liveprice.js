import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
        },
        date: { type: Number },
        open: { type: Number },
        high: { type: Number },
        low: { type: Number },
        close: { type: Number },
        volume: { type: Number },
    });

export default mongoose.model("Liveprice", schema);