
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Joker from '../../images/J.jfif'
import { Link } from "react-router-dom";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
    Grid
} from '@material-ui/core/'
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
    },
    media: {
        paddingTop: '81.25%',
        borderRadius: '50%',
        margin: '28px'
    },
    root2: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    gcontainer:{
        paddingLeft: "50px",
        paddingRight: "20px"
    }
  }));


const About = () => {

    let history=useHistory();
    function handleClick(e) {
        e.preventDefault();
        history.push('/');
        window.location.reload();
      }

      const classes = useStyles();
      const preventDefault = (event) => event.preventDefault();
    return (
        <div className={classes.root2}>
        <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"

                
            >

            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
        <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
        <CardMedia
          className={classes.media}
          image={Joker}
          title="Joker"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1" fontWeight="fontWeightBold">
              <Box fontSize={30}>
            Meet Dobariya
            </Box>
          </Typography>
          <Typography variant="body2" component="p" fontWeight="fontWeightMedium">
          <Box fontSize={20}>
          I am Competitive Coder. I love solving Problem. I hate Frontend.
            </Box>
            
          </Typography>
        </CardContent>
      <CardActions>
          <Link  to={{pathname:'https://github.com/Meet35'}} target="_blank" >
          <GitHubIcon fontSize="large"/>
          </Link>
          <Link  to={{pathname:'https://www.linkedin.com/in/meet-dobariya-827b6519a/'}} target="_blank" >
          <LinkedInIcon fontSize="large"/>
          </Link>
      </CardActions>
    </Card>
    </Grid>

            <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
        <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
        <CardMedia
          className={classes.media}
          image={Joker}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1" fontWeight="fontWeightBold">
              <Box fontSize={30}>
            Meet Dobariya
            </Box>
          </Typography>
          <Typography variant="body2" component="p" fontWeight="fontWeightMedium">
          <Box fontSize={20}>
          I am Competitive Coder. I love solving Problem. I hate Frontend.
            </Box>
            
          </Typography>
        </CardContent>
      <CardActions>
          <Link  to={{pathname:'https://github.com/Meet35'}} target="_blank" >
          <GitHubIcon fontSize="large"/>
          </Link>
          <Link  to={{pathname:'https://www.linkedin.com/in/meet-dobariya-827b6519a/'}} target="_blank" >
          <LinkedInIcon fontSize="large"/>
          </Link>
      </CardActions>
    </Card>
    </Grid>
    </Grid>
    </div>
    
    );
};

export default About;
