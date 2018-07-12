import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login';
import Inbound from './Inbound/List';
import PrivateRoute from '../router/PrivateRoute';
import './App.css';

class App extends Component {
  render() {
    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : '';
    const loggedIn = auth ? auth.token : '';
    console.log('Log in', loggedIn);
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute authed={loggedIn} path='/' component={Inbound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
