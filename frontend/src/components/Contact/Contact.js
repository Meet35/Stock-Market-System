import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../actions/types';
import useStyles from './styles';
import Input from './Input';

const initialState = { name:'', email: '', subject: '', message: '' };

const Contact = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();


    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/home');
    };

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
        window.location.reload();
      }


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        
        <Container component="main" maxWidth="xs" style={{ border: "none", boxShadow: "none" }}>
            <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

            <Paper className={classes.paper} elevation={3} style={{ border: "none", boxShadow: "none" }}>
                <Typography gutterBottom variant="h5" component="h1" fontWeight="fontWeightBold">
              <Box fontSize={30}>
            Contact Us
            </Box>
          </Typography>
          <Typography variant="body2" component="p" fontWeight="fontWeightMedium">
          <Box fontSize={20}>
          Get In Touch with us  
          </Box>
            
          </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Input name="name" label="Name" handleChange={handleChange} type="text" />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="email" label="Subject" handleChange={handleChange} type="text" />
                        <Input name="email" label="Message" handleChange={handleChange} type="text" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                        Send Message
                    </Button>
                   
                </form>
            </Paper>
        </Container>
    );
};

export default Contact;
