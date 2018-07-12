import React, { Component } from 'react';
import apiAuth from '../../services/auth';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      credentials: { email: '', password: '' },
      submitted: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  render () {
    const { credentials, submitted } = this.state;
    return (
        <div className="col-md-6 col-md-offset-3">
          <h2>Login</h2>
          <div className={'form-group' + (submitted && !credentials.email ? ' has-error' : '')}>
            <label htmlFor="email">Username</label>
            <input type="text" 
              className="form-control" 
              name="email" 
              value={credentials.email}
              onChange={this.onChange} 
            />
            {submitted && !credentials.email &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !credentials.password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" 
              className="form-control" 
              name="password" 
              value={credentials.password} 
              onChange={this.onChange} 
            />
            {submitted && !credentials.password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button type="button" 
              className="btn btn-primary" 
              onClick={this.onSave}>Login
            </button>
          </div>
      </div>
    );
  }

  onChange (event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({ credentials: credentials });
  }

  onSave(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { credentials } = this.state;
    if (credentials.email && credentials.password) {
      apiAuth.login(credentials).then(response => {
        this.props.history.push('/');
        localStorage.setItem('auth', JSON.stringify(response));
      }, error => {
        alert('Đăng nhập không thành công!');
      })
    }
  }
}

export default Login;