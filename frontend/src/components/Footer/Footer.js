
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import About from '../About/About';
import useStyles from './styles';
import { useHistory, useParams } from 'react-router-dom';

const Footer = () => {
    const classes = useStyles();
    let history = useHistory();

    const handleClick = async (e) => {
        console.log("Hi");
        e.preventDefault();
        history.push(`/about`);
        window.location.reload();
    }

    

    
    return (
        <AppBar className={classes.appBar} position="fixed" color="inherit">
            <Toolbar>
            {/* <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 260 }}>Add to Watchlist</Button> */}
            
            </Toolbar>
            <Toolbar>
            <Button variant="contained" onClick={handleClick}  color="secondary" size="large" style={{ width: 200 }}>About Us</Button>
              
            </Toolbar>
            <Toolbar>
            {/* <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 260 }}>Add to Watchlist</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
