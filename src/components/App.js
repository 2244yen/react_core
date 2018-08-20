import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './Common/Layout';
import authenticate from '../restricted';
import Login from './Login';
import routes from '../router';
import './App.css';

class App extends Component {

  renderRoutes (routes) {
    let result = '';
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route
          key={index}
          path={route.path}
          component={authenticate(route.component)}
          exact={route.exact}
        />
      })
    }
    return result;
  }

  render() {
    // const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : '';
    // const loggedIn = auth ? auth.token : '';
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Layout>
              {/* <Route exact path='/' component={authenticate(Dashboard)}></Route>
              <Route exact path='/inbound' component={authenticate(InboundList)}></Route>
              <Route exact path='/inbound/:id' component={authenticate(InboundDetail)}></Route> */}
              { this.renderRoutes(routes) }
            </Layout>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
