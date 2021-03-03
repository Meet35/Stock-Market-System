import Stockinfo from "../models/stockinfo.js";
import Stock from "../models/stock.js";

export const getStockinfo = async (req, res) => {

    const { symbol } = req.params;

    try {
        const data = await Stockinfo.findOne({ symbol: symbol });
        //console.log(data);
        const stockData = await Stock.find().sort({ symbol: 1 });
        var realSimilar = [];
        for (var i in data.similar) {
            var flag = 0;
            for (var j in stockData) {
                if (data.similar[i] == stockData[j].symbol) {
                    flag = 1;
                }
            }
            if (flag) {
                realSimilar.push(data.similar[i]);
            }
        }
        data.similar = realSimilar;
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};
