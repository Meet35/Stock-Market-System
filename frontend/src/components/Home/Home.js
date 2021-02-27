import React, { useState, useEffect } from 'react';
import * as api from '../../api/index.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, Typography, Container, TextField } from '@material-ui/core';
//import Datatable from '../Datatable/Datatable.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import Alpaca from '@alpacahq/alpaca-trade-api';
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;
require("es6-promise").polyfill();
require("isomorphic-fetch");

var whynotcount = [];

const Home = () => {
    const [info, setInfo] = useState([])
    const [list, setList] = useState([])
    const [option, setOption] = useState([])
    const [disable, setDisable] = useState(false)
    const [q, setQ] = useState({ symbol: "A", name: "Agilent Technologies Inc" })
    var data2 = new Set();
    var interval;
    const client = new AlpacaClient({
        credentials: {
            key: API_KEY,
            secret: API_SECRET,
            // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            paper: true,
        },
        rate_limit: true,
    })
    async function getList() {
        try {
            const { data } = await api.getWatchlist();
            console.log(data);
            setList(data);
            whynotcount = data;
        } catch (error) {
            console.log(error);
        }
    }

    async function updating(symbol) {
        try {
            const { data } = await api.updateWatchlist({ symbol });
            //console.log(data);
            //getList();
        } catch (error) {
            console.log(error);
        }
    }

    /*useEffect(() => {
        var dummy = [];
        for (var i in list) {
            for (var j in info) {
                if (list[i] === info[j].symbol) {
                    dummy.push({ symbol: info[j].symbol, name: info[j].name, price: "" });
                }
            }
        }
        console.log(dummy);
        setFinal(dummy);
    }, [list])*/


    /*useEffect(() => {
        interval = setInterval(() => {
            for (var i in final) {
                alpaca.lastTrade(final[i].symbol).then((response) => {
                    console.log(response);
                    setFinal(final.map(item => item.symbol == final[i].symbol ? { ...item, price: response.last.price } : item));
                })
            }
        }, 5000);
    }, [final])*/

    async function getPrice() {
        try {
            var pricess = [];
            for (var i in whynotcount) {
                var res = await client.getLastTrade({ symbol: whynotcount[i].symbol });
                pricess.push({ symbol: whynotcount[i].symbol, name: whynotcount[i].name, price: res.last.price });
            }
            console.log(pricess);
            setList(pricess);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/stock")
            .then((response) => { return response.json(); })
            .then((data) => {
                setInfo(data);
                console.log(data);
                setOption(data.map(({ name, symbol }) => ({ name: name, value: symbol })));
                getList().then(() => {
                    interval = setInterval(() => {
                        getPrice();
                    }, 5000);
                }).catch(() => {
                    console.log("sometimes it happens");
                });

            });
        return () => clearInterval(interval);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updating(q.symbol);
        await getList();
        if (list.length == 4) {
            setDisable(true);
        }
    };

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
    //const bull = <span className={classes.bullet}>•</span>;

    async function handleClick(symbol, e) {
        e.preventDefault();
        try {
            const { data } = await api.updateWatchlist({ symbol });
        } catch (error) {
            console.log(error);
        }
        await getList();
        if (list.length == 5) {
            setDisable(false);
        }
    }

    return (
        <Container maxWidth="lg" >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid item xs>
                        <Autocomplete
                            id="combo-box-demo"
                            options={info}
                            getOptionLabel={(option) => option.symbol + " - " + option.name}
                            style={{ width: 600 }}
                            autoComplete
                            value={q}
                            onChange={(event, newValue) => {
                                setQ(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="search stocks" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button disabled={disable} variant="contained" type="submit" color="secondary" size="large" style={{ width: 260 }}>Add to Watchlist</Button>
                    </Grid>
                </Grid>
            </form>
            <hr />
            {list.map((row, index) =>
                <Box mb={1}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader
                            avatar={
                                <Typography>
                                    {row.symbol}
                                </Typography>
                            }
                            action={
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={(e) => handleClick(row.symbol, e)}
                                >
                                    Delete
                                </Button>
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                {row.name}
                            </Typography>
                            <Typography variant="h6" component="h6" key={index}>
                                {row.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
};

export default Home;
