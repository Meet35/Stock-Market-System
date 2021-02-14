import express from 'express';
import mongoose from 'mongoose';

import Watchlist from '../models/watchlist.js';

const router = express.Router();

export const getWatchlist = async (req, res) => {

    try {
        const watchlist = await Watchlist.findOne({ userid: req.userId });

        res.status(200).json(watchlist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateWatchlist = async (req, res) => {

    const symbol = req.body;
    // console.log(symbol);
    //console.log(symbol.symbol);
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
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