import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import About from '../About/About';
import useStyles from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Joker from '../../images/J.jfif'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { withStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core/'




const Footer = () => {
  const classes = useStyles();

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

  return (
    <div className={classes.root2}>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">

        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
          <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
            <CardContent>
              <WhiteTextTypography gutterBottom variant="h5" component="h1" fontWeight="fontWeightBold">
                <Box fontSize={25}>
                  About
                </Box>
              </WhiteTextTypography>
              <hr />
              <WhiteTextTypography variant="body2" component="p" fontWeight="fontWeightMedium">
                <Box fontSize={15}>
                  StockWatch is Software that provides  live data of stocks and also past 3 years data. It also contains Charts for better Visualization. It has fundamental data of all companies. You can make trigger for particular stock and when cindition satisfies sys.tem mails you about that event...
                </Box>
              </WhiteTextTypography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
          <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
            <CardContent>
              <WhiteTextTypography gutterBottom variant="h5" component="h1" fontWeight="fontWeightBold">
                <Box fontSize={25}>
                  Quick Links
                </Box>
              </WhiteTextTypography>
              <hr />
              <WhiteTextTypography variant="body2" component="p" fontWeight="fontWeightMedium">
                <Box fontSize={15}>
                  <Link to={{ pathname: `/about` }} style={{ color: "#FFFFFF" }} >About Us</Link>
                </Box>
              </WhiteTextTypography>
              <Typography variant="body2" component="p" fontWeight="fontWeightMedium">
                <Box fontSize={15}>
                  <Link to={{ pathname: `/contact` }} style={{ color: "#FFFFFF" }}>Contact Us</Link>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <hr />
      <WhiteTextTypography>Copyright © 2021 All Rights Reserved by StockWatch</WhiteTextTypography>
    </div >


  );
};

export default Footer;
