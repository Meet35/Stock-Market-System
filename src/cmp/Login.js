import React, { Component } from 'react';

class Login extends Component
{

    login()
    {
        console.log("state",this.state.email);
        fetch('http://127.0.0.1:8000/api/login',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp.success.token)
                localStorage.setItem("auth",JSON.stringify(resp.success.token))
            })
        })
    }


    render()
    {
        return (<div>
            <div>
                <input type="text"
                    onChange={(e) => {this.setState({ email:e.target.value }) }}/>
                <br/>
                <br/>
                <input type="text"
                    onChange={(e) => {this.setState({ password:e.target.value }) }}/>
                <br/>

                <button onClick={() => this.login()}> Login </button>
            </div>
        </div>);
    }
}


export default Login;