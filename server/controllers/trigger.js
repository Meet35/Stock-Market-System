import Trigger from "../models/trigger.js";
import Stock from "../models/stock.js";

export const getTrigger = async (req, res) => {

    try {
        const data = await Trigger.find({ userid: req.userId }).sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getAllTrigger = async (req, res) => {

    try {
        const data = await Trigger.find().sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const deleteTrigger = async (req, res) => {

    const { id } = req.params;
    try {
        var data = await Trigger.deleteOne({ _id: id });
        res.json({ message: "Trigger deleted successfully." });
    }
    catch (err) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const createTrigger = async (req, res) => {
    try {
        const result = await Stock.findOne({ symbol: req.body.symbol });
        const data = await Trigger.create({ symbol: req.body.symbol, name: result.name, strikeupperprice: req.body.strikeupperprice, email: req.body.email, userid: req.userId, strikelowerprice: req.body.strikelowerprice });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}