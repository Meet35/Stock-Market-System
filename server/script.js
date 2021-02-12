import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;
import Stock from '../server/models/stock.js';
import mongoose from 'mongoose';

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
});

var data = [];

alpaca.getAssets({
    status: 'active',
    asset_class: 'us_equity'
}).then((res) => {
    for (var i in res) {
        var item = res[i];
        var obj;
        if (item.status == 'active' && item.tradable && item.easy_to_borrow) {
            obj = { symbol: item.symbol, name: item.name, exchange: item.exchange }
        }
        data.push(obj);
    }
})

const res = async (data) => {
    try {
        const result = await Stock.insertMany(data);
        console.log(result.insertedCount);
        return result.insertedCount;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

console.log(res);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("stock").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});