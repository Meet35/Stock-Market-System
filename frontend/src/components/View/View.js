import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import * as api from '../../api/index.js';
import moment from 'moment';
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;
require("es6-promise").polyfill();
require("isomorphic-fetch");

//var ohlc = [], volume = [];

const View = () => {

    const [Stock, setStock] = useState('')
    const [ohlc, setOhlc] = useState([]);
    const [volume, setVolume] = useState([]);
    let params = useParams();
    let location = useLocation();
    let history = useHistory();

    const client = new AlpacaClient({
        credentials: {
            key: API_KEY,
            secret: API_SECRET,
            paper: true,
        },
        rate_limit: true,
    })

    useEffect(() => {
        const s = params.symbol;
        setStock(s);
        console.log(s);

        api.getPrice(s)
            .then((data) => {
                var priceData = data.data.data;
                console.log(priceData);
                var dummyOhlc = [], dummyVolume = [];
                for (var i in priceData) {
                    dummyOhlc.push([
                        Date.parse(priceData[i].date), // the date
                        priceData[i].open, // open
                        priceData[i].high, // high
                        priceData[i].low, // low
                        priceData[i].close // close
                    ]);

                    dummyVolume.push([
                        Date.parse(priceData[i].date), // the date
                        priceData[i].volume // the volume
                    ]);
                }
                setOhlc(dummyOhlc);
                setVolume(dummyVolume);
                console.log(dummyOhlc);
                console.log(dummyVolume);
            })
            .catch(err => console.log(err));
    }, [])

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 8,
        },
        button: {
            marginRight: 3,
            align: `right`,
        },
        avatar: {
            backgroundColor: 'red',
        },
    });

    const classes = useStyles();

    const configPrice = {
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,
            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: [{
            type: 'ohlc',
            id: `${Stock}-ohlc`,
            name: `${Stock} Stock Price`,
            data: ohlc
        }, {
            type: 'column',
            id: `${Stock}-volume`,
            name: `${Stock} Volume`,
            data: volume,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    };


    return (
        <Container maxWidth="lg" >
            <ReactHighcharts config={configPrice}></ReactHighcharts>
        </Container>
    );
};

export default View;
