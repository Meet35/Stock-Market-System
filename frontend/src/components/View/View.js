import React, { useState, useEffect } from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import * as api from '../../api/index.js';
import moment from 'moment';
import avocado from 'highcharts/themes/sand-signika';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;
require("es6-promise").polyfill();
require("isomorphic-fetch");

//var ohlc = [], volume = [];
avocado(ReactHighcharts.Highcharts);

var groupingUnits = [[
    'week',                         // unit name
    [1]                             // allowed multiples
], [
    'month',
    [1, 2, 3, 4, 6]
]];

const View = () => {

    const [stock, setStock] = useState([])
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
        const n = location.state;
        setStock(n);
        //console.log(n);

        api.getPrice(s)
            .then((data) => {
                var priceData = data.data.data;
                //console.log(priceData);
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
                //console.log(dummyOhlc);
                //console.log(dummyVolume);
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

        rangeSelector: {
            selected: 1
        },

        title: {
            text: `${stock.symbol} - ${stock.name}`
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '70%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },

        series: [{
            type: 'candlestick',
            name: `${stock.symbol} Stock Price`,
            data: ohlc,
            dataGrouping: {
                units: groupingUnits
            }
        }, {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
            dataGrouping: {
                units: groupingUnits
            }
        }]
    };

    function handleClick(e) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <Container maxWidth="lg" >
            <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button>
            <ReactHighcharts config={configPrice}></ReactHighcharts>
        </Container>
    );
};

export default View;
