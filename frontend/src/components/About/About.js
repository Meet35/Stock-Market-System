
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { useHistory, useParams } from 'react-router-dom';

const About = () => {

    let history=useHistory();
    function handleClick(e) {
        e.preventDefault();
        history.push('/');
        window.location.reload();
      }
    
    return (
        <Typography>
            <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

        </Typography>
    );
};

export default About;
