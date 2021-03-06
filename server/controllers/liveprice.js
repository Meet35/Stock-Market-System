import Liveprice from "../models/liveprice.js";

export const getPrice = async (req, res) => {

    const { symbol } = req.params;

    try {
        const data = await Liveprice.find({ symbol: symbol }).sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};
