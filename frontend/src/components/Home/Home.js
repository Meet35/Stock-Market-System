import React, { useState, useEffect } from 'react';
import * as api from '../../api/index.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
require("es6-promise").polyfill();
require("isomorphic-fetch");

const Home = () => {
    const [data, setData] = useState([])
    const [list, setList] = useState("")
    const [option, setOption] = useState([])
    const [q, setQ] = useState({ symbol: "A", name: "Agilent Technologies Inc" })

    async function getList() {
        try {
            const { data } = await api.getWatchlist();
            setList(data);
            console.log(data.symbols);
            console.log(list);
        } catch (error) {
            console.log(error);
        }
    }

    async function updating() {
        try {
            const { result } = await api.updateWatchlist({ symbol: "IC" });
            console.log(result.symbols);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/stock")
            .then((response) => { console.log(response); return response.json(); })
            .then((data) => {
                setData(data);
                console.log(data);
                setOption(data.map(({ name, symbol }) => ({ name: name, value: symbol })));
            });
        getList();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(q);
    };

    return (
        <Container maxWidth="lg" >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid item xs>
                        <Autocomplete
                            id="combo-box-demo"
                            options={data}
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
                        <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 260 }}>Add to Watchlist</Button>
                    </Grid>
                </Grid>
            </form>

        </Container>
    );
};

export default Home;
