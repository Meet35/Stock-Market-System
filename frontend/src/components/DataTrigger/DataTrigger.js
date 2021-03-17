import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Grid, Typography, Container, Avatar } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
require("es6-promise").polyfill();
require("isomorphic-fetch");


const DataTrigger = () => {

    const [list, setList] = useState([]);
    let history = useHistory();

    function getTriggers() {
        api.getTrigger()
            .then(data => {
                //console.log(data);
                setList(data.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTriggers();
    }, []);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            backgroundColor: grey
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
        date: {
            marginRight: 3,
            align: `right`,
        },
        avatar: {
            backgroundColor: red[500],
            width: 200
        },
    });

    const classes = useStyles();

    const deleteClick = async (id, e) => {
        e.preventDefault();
        //console.log(id);
        api.deleteTrigger(id)
            .then(data => {
                console.log(data);
                getTriggers();
            })
            .catch(err => console.log(err));
    }

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
        window.location.reload();
    }

    return (
        <Container maxWidth="lg">
            <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
            {list.map((row, index) =>
                <Box mb={1} key={index}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}>
                                    {row.symbol} - {row.name}
                                </Avatar>
                            }
                            action={
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={(e) => deleteClick(row._id, e)}>
                                    Delete
                                </Button>
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                {row.strikeupperprice}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {row.strikelowerprice}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {row.email}
                            </Typography>
                            <Typography variant="body2" className={classes.date}>
                                {row.date}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
};

export default DataTrigger;
