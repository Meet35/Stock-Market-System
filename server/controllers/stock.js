import Stock from "../models/stock.js";

export const getstocks = async (req, res) => {
    try {
        const data = await Stock.find().sort({ symbol: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};
/*
exports.findAll = (req, res) => {
    Stock.find()
        .sort({ symbol: 1 })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occured",
            });
        });
};
*/

export const getStock = async (req, res) => {
    try {
        const data = await Stock.findOne({ symbol: req.params.symbol });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};