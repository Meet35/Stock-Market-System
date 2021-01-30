import logo from './logo.svg';
import './App.css';
import Home from './cmp/Home';
import Login from './cmp/Login';
import Auth from './cmp/Auth';
import About from './cmp/About';
import Protected from './cmp/Protected';
import Nav from './cmp/Nav';
// import .Home.js from './cmp/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Auth></Auth>
      <Router>
        <Nav/>
        {/* <Link to="auth" > Home </Link> */}
        <Switch>
          <Route path="/about">
            {/* <About /> */}
            <Protected cmp={About}/>
          </Route>
          <Route path="/home">
            {/* <Home /> */}
            <Protected cmp={Home}/>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
