import React, { Component } from 'react';
import {
    Redirect
} from "react-router-dom";




class Auth extends Component {

    constructor() {
        super()
        this.state = {
            isRegister: false,
            history: null
        }
    }
    login() {
        console.log("state", this.state.isRegister);
        fetch('http://127.0.0.1:5000/user/signin', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp.token)
                localStorage.setItem("auth", JSON.stringify(resp.token))
            })
        })
    }


    register() {
        console.log("state", this.state.isRegister);
        fetch('http://127.0.0.1:5000/user/signup', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp.token)
                localStorage.setItem("auth", JSON.stringify(resp.token))
            })
        })
    }


    render() {
        var auth = JSON.parse(localStorage.getItem('auth'))
        return (
            <div>
                {
                    auth ? <Redirect to="/home" /> : null
                }
                {
                    !this.state.isRegister ?
                        <div>
                            <input type="text" placeholder="Email ID"
                                onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <br />
                            <br />
                            <input type="text" placeholder="password"
                                onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            <br />

                            <button onClick={() => this.login()}> Login </button>
                            <button onClick={() => this.setState({ isRegister: true })}> Go to Register </button>
                        </div>
                        :
                        <div>
                            <input type="text"
                                placeholder="name"
                                onChange={(e) => { this.setState({ name: e.target.value }) }} />
                            <br />
                            <br />
                            <input type="text"
                                placeholder="email"
                                onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            <br />
                            <br />
                            <input type="text"
                                placeholder="password"
                                onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            <br />

                            <button onClick={() => this.register()}> Register </button>
                            <button onClick={() => this.setState({ isRegister: false })}> Go to Login </button>
                        </div>
                }
            </div>);
    }
}


export default Auth;