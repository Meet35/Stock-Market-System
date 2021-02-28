import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        logo: { type: String },
        listdate: { type: String },
        cik: { type: String },
        bloomberg: { type: String },
        figi: { type: String },
        lei: { type: String },
        sic: { type: Number },
        country: { type: String },
        industry: { type: String },
        sector: { type: String },
        marketcap: { type: Number },
        employees: { type: Number },
        phone: { type: Number },
        ceo: { type: String },
        url: { type: String },
        description: { type: String },
        exchange: { type: String },
        name: { type: String },
        symbol: {
            type: String,
            unique: true,
            required: true,
        },
        exchangeSymbol: { type: String },
        hq_address: { type: String },
        hq_state: { type: String },
        hq_country: { type: String },
        type: { type: String },
        updated: { type: String },
        tags: { type: [String], default: [] },
        similar: { type: [String], default: [] },
        active: { type: Boolean }
    });

export default mongoose.model("Stockinfo", schema);
