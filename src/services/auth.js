import axios from 'axios';
import config from '../config';
import qs from 'qs';

const LOGIN_URL = config.url.concat('/auth/token')

const AUTH_BASIC_HEADERS = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

var login = (creds) => {
  const data = qs.stringify(creds);
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_URL, data, AUTH_BASIC_HEADERS).then(response => {
      resolve(response.data)
    }, response => {
      reject(response)
    })
  })
}

var logout = () => {
  localStorage.removeItem('auth');
}

export default {
  login: login,
  logout: logout
}