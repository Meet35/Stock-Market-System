import Stock from './models/stock.js';

export const removeStock = async (req, res) => {
    try {
        const data = await Stock.deleteMany({});
        res.status(200).json({ message: "successsssss" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};