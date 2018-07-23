import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render () {
    return (
      <div className="app">
        <Header></Header>
        <div className="container">
          { this.props.children }
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Layout;