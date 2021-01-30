import React, { Component } from 'react';

import {
    Redirect
  } from "react-router-dom";
  


function Protected(props)
{
    const Cmp=props.cmp;
    var auth=JSON.parse(localStorage.getItem('auth'))
    console.log(auth)

    return <div> {auth ? <Cmp/> : <Redirect to="login"> </Redirect>} </div>
}


export default Protected;