import Stockinfo from "../models/stockinfo.js";

export const getStockinfo = async (req, res) => {

    const { symbol } = req.params;

    try {
        const data = await Stockinfo.findOne({ symbol: symbol });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};
