import axios from 'axios';
import Auth from '../services/auth';

class Api {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
    axios.defaults.headers.common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  getToken () {
    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : '';
    return auth ? auth.token : ''
  }

  getHeaders () {
    const token = this.getToken();
    return {
      headers: {
        'Authorization': token
      },
      emulateJSON: true
    }
  }
  checkTokenIsValid = (res) => {
    const status = res.response.status
    const error = res.response.statusText
    if ((status === 401 && (error === 'invalid_token' || error === 'expired_token' || error === 'UNAUTHORIZED')) || status === 403) {
      Auth.logout();
    }
  }

  get (route) {
    return new Promise((response, reject) => {
      axios.get(this.baseUrl + route, this.getHeaders()).then((res) => {
        response(res)
      }, (res) => {
        reject(res)
        this.checkTokenIsValid(res)
      })
    })
  }

  post (route, data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + route, data, this.getHeaders()).then(res => {
        resolve(res)
      }, (res) => {
        reject(res)
        this.checkTokenIsValid(res)
      })
    })
  }

  put (route, data) {
    return new Promise((resolve, reject) => {
      axios.put(this.baseUrl + route, data, this.getHeaders()).then(res => {
        resolve(res)
      }, (res) => {
        reject(res)
        this.checkTokenIsValid(res)
      })
    })
  }
}

export default Api;