import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './Common/Layout';
import authenticate from '../restricted';
import Login from './Login';
import Dashboard from './Dashboard';
import InboundList from './Inbound/List';
import InboundDetail from './Inbound/Detail';
import './App.css';

class App extends Component {
  render() {
    // const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : '';
    // const loggedIn = auth ? auth.token : '';
    return (
      <Router>
        <div className="app">
          {/* <NavLink to={ `${props.match.url}/us` }
            className="link">Us Office</NavLink> */}
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Layout>
              <Route exact path='/' component={authenticate(Dashboard)}></Route>
              <Route exact path='/inbound' component={authenticate(InboundList)}></Route>
              <Route exact path='/inbound/:id' component={authenticate(InboundDetail)}></Route>
            </Layout>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
