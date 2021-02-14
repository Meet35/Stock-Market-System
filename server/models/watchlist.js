import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        symbols: { type: [String], default: [] },
        userid: {
            type: String,
            required: true,
        }
    });

export default mongoose.model("Watchlist", schema);
