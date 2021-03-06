import React, { Component } from 'react';
import Auth from '../../services/auth';
import '../../assets/styles/main.css';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false
    }
  }

  render () {
    const user = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : '';
    const userName = user ? user.name : '';
    return (
      <nav className="navbar navbar-default ghn-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Brand</a>
          </div>
          <div className="collapse navbar-collapse ghn-menu" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/" activeClassName="active">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/inbound">Nhập hàng</NavLink>
              </li>
              <li>
                <NavLink to="/outbound">Xuất hàng</NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right ghn-user-info">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{ userName }<span className="caret"></span></a>
                <ul className="dropdown-menu ghn-dropdown-menu">
                  <li><a onClick={Auth.logout}>Đăng xuất</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;