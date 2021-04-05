import Alpaca from '@alpacahq/alpaca-trade-api';
import Stock from './models/stock.js';
import Price from './models/price.js';
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

export const fetchData = async (req, res) => {
    try {
        fs.readFile("stocks.json", function (err, data) {
            if (err) throw err;
            const yadata = JSON.parse(data);
            //console.log(yadata);
            var symbols = [];
            for (var i = 0; i < 200; i++) {
                symbols.push(yadata[i].symbol);
            }
            var todayDate = new Date().toISOString().slice(0, 10);
            //todayDate = "2021-03-26";
            alpaca.getBars('1D', symbols, { limit: 1000, start: `${todayDate}T12:00:00-04:00`, end: `${todayDate}T22:00:00-04:00` })
                .then(response => {
                    var dummy = [];
                    var updatedStock = [];
                    for (var i = 0; i < symbols.length; i++) {
                        for (var bar in response[symbols[i]]) {
                            dummy.push({ symbol: symbols[i], date: response[symbols[i]][bar].startEpochTime, open: response[symbols[i]][bar].openPrice, high: response[symbols[i]][bar].highPrice, low: response[symbols[i]][bar].lowPrice, close: response[symbols[i]][bar].closePrice, volume: response[symbols[i]][bar].volume });
                            for (var j in yadata) {
                                if (yadata[j].symbol == symbols[i]) {
                                    updatedStock.push({ symbol: symbols[i], name: yadata[j].name, lastprice: response[symbols[i]][bar].openPrice });
                                }
                            }
                        }
                    }
                    if (dummy.length > 0) {

                        Price.insertMany(dummy)
                            .then((res) => console.log("suc1"))
                            .catch(err => console.log(err));

                        //console.log(updatedStock);
                        Stock.insertMany(updatedStock)
                            .then((res) => console.log("suc11"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

            var data1 = [];
            for (var i = 200; i < 400; i++) {
                data1.push(yadata[i].symbol);
            }
            alpaca.getBars('1D', data1, { limit: 1000, start: `${todayDate}T12:00:00-04:00`, end: `${todayDate}T22:00:00-04:00` })
                .then(response => {
                    var dummy = [];
                    var updatedStock = [];
                    for (var i = 0; i < data1.length; i++) {
                        for (var bar in response[data1[i]]) {
                            dummy.push({ symbol: data1[i], date: response[data1[i]][bar].startEpochTime, open: response[data1[i]][bar].openPrice, high: response[data1[i]][bar].highPrice, low: response[data1[i]][bar].lowPrice, close: response[data1[i]][bar].closePrice, volume: response[data1[i]][bar].volume });
                            for (var j in yadata) {
                                if (yadata[j].symbol == data1[i]) {
                                    updatedStock.push({ symbol: data1[i], name: yadata[j].name, lastprice: response[data1[i]][bar].openPrice });
                                }
                            }
                        }
                    }
                    if (dummy.length > 0) {

                        Price.insertMany(dummy)
                            .then((res) => console.log("suc2"))
                            .catch(err => console.log(err));

                        //console.log(updatedStock);
                        Stock.insertMany(updatedStock)
                            .then((res) => console.log("suc22"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

            var data2 = [];
            for (var i = 400; i < 494; i++) {
                data2.push(yadata[i].symbol);
            }
            alpaca.getBars('1D', data2, { limit: 1000, start: `${todayDate}T12:00:00-04:00`, end: `${todayDate}T22:00:00-04:00` })
                .then(response => {
                    var dummy = [];
                    var updatedStock = [];
                    for (var i = 0; i < data2.length; i++) {
                        for (var bar in response[data2[i]]) {
                            dummy.push({ symbol: data2[i], date: response[data2[i]][bar].startEpochTime, open: response[data2[i]][bar].openPrice, high: response[data2[i]][bar].highPrice, low: response[data2[i]][bar].lowPrice, close: response[data2[i]][bar].closePrice, volume: response[data2[i]][bar].volume });
                            for (var j in yadata) {
                                if (yadata[j].symbol == data2[i]) {
                                    updatedStock.push({ symbol: data2[i], name: yadata[j].name, lastprice: response[data2[i]][bar].openPrice });
                                }
                            }
                        }
                    }
                    if (dummy.length > 0) {

                        Price.insertMany(dummy)
                            .then((res) => console.log("suc3"))
                            .catch(err => console.log(err));

                        //console.log(updatedStock);
                        Stock.insertMany(updatedStock)
                            .then((res) => console.log("suc33"))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            res.status(200).json({ message: "successsssss" });
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};