/*import './App.css';
import Home from './cmp/Home';
import Auth from './cmp/Auth';
import About from './cmp/About';
import Protected from './cmp/Protected';
import Nav from './cmp/Nav';
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        <Nav />
        {/* <Link to="auth" > Home </Link> *//*}
<Switch>
<Route path="/about">
{/* <About /> *//*}
<Protected cmp={About} />
</Route>
<Route path="/home">
{/* <Home /> *//*}
<Protected cmp={Home} />
</Route>
<Route path="/">
<Auth />
</Route>
</Switch>
</Router>
</div>
);
}

export default App;
*/

/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
*/

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import View from './components/View/View';
import DataTrigger from './components/DataTrigger/DataTrigger';
import About from './components/About/About';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => (
            localStorage.getItem('profile') ? (
              <Home />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route path="/auth" exact component={Auth} />
          <Route exact path="/triggers" render={() => (
            localStorage.getItem('profile') ? (
              <DataTrigger />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/view/:symbol" render={() => (
            localStorage.getItem('profile') ? (
              <View />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/about" render={() => (
              <About/>
          )} />
        </Switch>
        <Footer/>
      </Container>
    </BrowserRouter>
  )
};

export default App;