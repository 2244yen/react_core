import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login';
import Inbound from './Inbound/List';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Inbound}></Route>
            {
              // <Route path="/logout" component={Logout}></Route>
              // <Master>
              //   <Route exact path="/" component={Home}></Route>
              //   <Route path="/books" component={Book}></Route>
              // </Master>
            }
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
