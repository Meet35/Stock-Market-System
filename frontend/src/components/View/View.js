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
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


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


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
  }));

const View = () => {
    

    const [stock, setStock] = useState([])
    const [ohlc, setOhlc] = useState([]);
    const [volume, setVolume] = useState([]);
    const [data, setData] = useState([])
    let params = useParams();
    let location = useLocation();
    let history = useHistory();
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
    

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
        
        <div className={classes.root}>
        <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Chart"  />
          <Tab label="Fundamental Data"  />
          <Tab label="Master plan" disabled/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Container maxWidth="lg" >
            {/* <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button> */}
            <ReactHighcharts config={configPrice}></ReactHighcharts>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      {/* <div className={classes.root}> */}
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Company Name
                </Typography>
                <Typography variant="body2" gutterBottom>
                  CEO
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone Number
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Extra
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    {/* </div> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
    //     <Toolbar>
    // <Button variant="outlined" color="inherit" >
    //     Button 1
    // </Button>
    // <Button variant="outlined" color="inherit">
    //     Button 2
    // </Button>
    // </Toolbar>
        // <Container maxWidth="lg" >
        //     <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button>
        //     <ReactHighcharts config={configPrice}></ReactHighcharts>
        // </Container>
    );
};

export default View;
