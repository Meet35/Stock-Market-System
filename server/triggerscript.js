import nodemailer from 'nodemailer';
import Trigger from './models/trigger.js';
import Liveprice from './models/liveprice.js';

const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD
    }
});

export const checkExecuteTrigger = async (req, res) => {
    try {
        const triggers = await Trigger.find({});
        //console.log(triggers);
        for (var i in triggers) {
            const liveStockLastPrice = await Liveprice.findOne({ symbol: triggers[i].symbol }).sort({ date: -1 });
            //console.log(new Date(liveStockLastPrice.date * 1000));
            if (triggers[i].strikelowerprice >= liveStockLastPrice.low) {
                var mailOptions = {
                    from: EMAIL_ID,
                    to: triggers[i].email,
                    subject: `Your trigger event for stock ${liveStockLastPrice.symbol} executed ${new Date(liveStockLastPrice.date * 1000)}`,
                    text: `current price :${liveStockLastPrice.low}$ is touched to the your lower price limit ${triggers[i].strikelowerprice}$`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                var data = await Trigger.deleteOne({ _id: triggers[i]._id });
            }
            else if (triggers[i].strikeupperprice <= liveStockLastPrice.high) {
                var mailOptions = {
                    from: EMAIL_ID,
                    to: triggers[i].email,
                    subject: `Your trigger event for stock ${liveStockLastPrice.symbol} executed ${new Date(liveStockLastPrice.date * 1000)}`,
                    text: `current price :${liveStockLastPrice.high}$ is touched to the your upper price limit ${triggers[i].strikeupperprice}$`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                var data = await Trigger.deleteOne({ _id: triggers[i]._id });
            }
        }
        res.status(200).json({ message: "TriggerSuccess" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};