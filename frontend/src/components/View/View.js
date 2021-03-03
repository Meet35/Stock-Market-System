import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, CardMedia, Avatar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import * as api from '../../api/index.js';
import avocado from 'highcharts/themes/sand-signika';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
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
          <Container>{children}</Container>
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

const View = () => {

  const [stock, setStock] = useState([])
  const [similarstck, setSimilarstck] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  const [volume, setVolume] = useState([]);
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

  useEffect(() => {
    const s = params.symbol;
    //const n = location.state;
    console.log(s);
    api.getFundamental(s)
      .then((data) => {
        console.log(data.data);
        setStock(data.data);
        setSimilarstck(data.data.similar);
      })
      .catch(err => console.log(err));

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
      })
      .catch(err => console.log(err));
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundcolor: theme.palette.background.paper,
      padding: theme.spacing(3),
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
      backgroundcolor: 'red',
    },
    rounded: {
      color: '#fff',
      backgroundColor: '#f0a',
      width: theme.spacing(30),
      height: theme.spacing(3),
    },
  }));

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
    history.push('/');
    window.location.reload();
  }

  function gotoStock(item, e) {
    e.preventDefault();
    history.push(`/view/${item}`);
    window.location.reload();
  }

  return (

    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Chart" />
          <Tab label="Fundamental Data" />
          <Tab label="Real Time" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container maxWidth="lg" >
          {/* <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button> */}
          <ReactHighcharts config={configPrice}></ReactHighcharts>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper className={classes.root} style={{ textTransform: "none" }}>
          <Grid container spacing={3}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={stock.logo} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={3}>
                <Grid item xs>
                  <Typography variant="h4" >
                    {stock.symbol} - {stock.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {stock.ceo ? <p>Ceo : {stock.ceo}</p> : stock.ceo}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {stock.hq_address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {stock.hq_state}, {stock.hq_country}
                  </Typography>
                  <Typography variant="body2">
                    MarketCap : {stock.marketcap}$
                  </Typography>
                  <Typography variant="body2">
                    Employees : {stock.employees}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="right">{stock.exchangeSymbol}</Typography>
                <Typography variant="body2" align="right">{stock.exchange}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={1}>
              <Button variant="contained" size="small" style={{ color: '#fff', backgroundColor: '#6699ff', marginRight: '8px' }}>
                {stock.sector}
              </Button>
              <Button variant="contained" size="small" style={{ color: '#fff', backgroundColor: '#6699ff' }}>
                {stock.industry}
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                {stock.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: 'pointer' }} paragraph>
                Listed from {stock.listdate}
              </Typography>
              <Link href={stock.url} variant="body2">
                {stock.url}
              </Link>
              <Typography variant="body2" style={{ cursor: 'pointer' }} paragraph>
                Similar :
              </Typography>
              {
                similarstck.map((item, index) =>
                  <Button variant="contained" size="medium" onClick={(e) => gotoStock(item, e)} style={{ color: '#000', backgroundColor: '#ddff99', marginRight: '12px' }} key={index} >
                    {item}
                  </Button>
                )
              }
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Container>
  );
};

export default View;
