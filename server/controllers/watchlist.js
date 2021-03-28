import express from 'express';
import mongoose from 'mongoose';

import Watchlist from '../models/watchlist.js';
import Stock from '../models/stock.js';

const router = express.Router();

export const getWatchlist = async (req, res) => {

    try {
        const watchlist = await Watchlist.findOne({ userid: req.userId });
        var data = [];
        //console.log(watchlist);
        for (var i in watchlist.symbols) {
            //console.log(watchlist.symbols[i]);
            var ans = await Stock.findOne({ symbol: watchlist.symbols[i] })
            data.push({ symbol: ans.symbol, name: ans.name, price: "", lastprice: ans.lastprice });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message, why: "why you do this to me?" });
    }
}

export const updateWatchlist = async (req, res) => {

    const symbol = req.body;
    // console.log(symbol);
    //console.log(symbol.symbol);
    if (!req.userId) {
        //console.log(req.userId);
        return res.json({ message: "why this" });
    }
    try {
        const watchlist = await Watchlist.findOne({ userid: req.userId });
        const index = watchlist.symbols.findIndex((sym) => sym === String(symbol.symbol));

        if (index === -1) {
            watchlist.symbols.push(symbol.symbol);
        } else {
            watchlist.symbols = watchlist.symbols.filter((sym) => sym !== String(symbol.symbol));
        }
        const updatedWatchlist = await Watchlist.findByIdAndUpdate(watchlist._id, watchlist, { new: true });
        //console.log(updateWatchlist);
        res.status(200).json(updatedWatchlist);
    } catch (error) {
        console.log(error);
    }
}

export default router;