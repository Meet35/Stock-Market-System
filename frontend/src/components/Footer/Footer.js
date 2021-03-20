
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import About from '../About/About';
import useStyles from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

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
        <Typography>
            Quick Links
            <Link to={{ pathname: `/about` }}>About Us</Link>
        </Typography>
        
        
    );
};

export default Footer;
