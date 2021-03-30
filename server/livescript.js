import Alpaca from '@alpacahq/alpaca-trade-api';
import Stock from './models/stock.js';
import Liveprice from './models/liveprice.js';
import fs from 'fs';

const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
});

export const fetchLivedata = async (req, res) => {
    try {
        /*
        const data = await Stock.find().sort({ symbol: 1 });
        var symbols = [];
        for (var i = 0; i < 200; i++) {
            symbols.push(data[i].symbol);
        }*/
        fs.readFile("stocks.json", function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);
            var symbols = [];
            for (var i = 0; i < 200; i++) {
                symbols.push(data[i].symbol);
            }
            var todayDate = new Date().toISOString().slice(0, 10);
            alpaca.getBars('1Min', symbols, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                .then(response => {
                    //console.log(response);
                    var dummy = [];
                    for (var i in symbols) {
                        var len = response[symbols[i]].length;
                        if (len == 0)
                            console.log(symbols[i]);
                        if (len > 0)
                            dummy.push({ symbol: symbols[i], date: response[symbols[i]][len - 1].startEpochTime, open: response[symbols[i]][len - 1].openPrice, high: response[symbols[i]][len - 1].highPrice, low: response[symbols[i]][len - 1].lowPrice, close: response[symbols[i]][len - 1].closePrice, volume: response[symbols[i]][len - 1].volume });
                    }
                    if (dummy.length > 0) {
                        Liveprice.insertMany(dummy)
                            .then((res) => console.log("suc1"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

            var data1 = [];
            for (var i = 200; i < 400; i++) {
                data1.push(data[i].symbol);
            }
            alpaca.getBars('1Min', data1, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                .then(response => {
                    var dummy = [];
                    for (var i in data1) {
                        var len = response[data1[i]].length;
                        if (len == 0)
                            console.log(symbols[i]);
                        if (len > 0)
                            dummy.push({ symbol: data1[i], date: response[data1[i]][len - 1].startEpochTime, open: response[data1[i]][len - 1].openPrice, high: response[data1[i]][len - 1].highPrice, low: response[data1[i]][len - 1].lowPrice, close: response[data1[i]][len - 1].closePrice, volume: response[data1[i]][len - 1].volume });
                    }
                    if (dummy.length > 0) {
                        Liveprice.insertMany(dummy)
                            .then((res) => console.log("suc2"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

            var data2 = [];
            for (var i = 400; i < 494; i++) {
                data2.push(data[i].symbol);
            }
            alpaca.getBars('1Min', data2, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                .then(response => {
                    var dummy = [];
                    for (var i in data2) {
                        var len = response[data2[i]].length;
                        if (len == 0)
                            console.log(symbols[i]);
                        if (len > 0)
                            dummy.push({ symbol: data2[i], date: response[data2[i]][len - 1].startEpochTime, open: response[data2[i]][len - 1].openPrice, high: response[data2[i]][len - 1].highPrice, low: response[data2[i]][len - 1].lowPrice, close: response[data2[i]][len - 1].closePrice, volume: response[data2[i]][len - 1].volume });
                    }
                    if (dummy.length > 0) {
                        Liveprice.insertMany(dummy)
                            .then((res) => console.log("suc3"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            res.status(200).json({ message: "successsssss" });
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};