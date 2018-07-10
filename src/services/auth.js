import config from '../config';
import axios from 'axios';
import qs from 'qs' ;

const LOGIN_URL = config.url.concat('/auth/token')

const AUTH_BASIC_HEADERS = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

var login = (creds) => {
 //  const params = { 'email': creds.email, 'password': creds.password }
  const data = qs.stringify(creds);
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_URL, data, AUTH_BASIC_HEADERS).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export default {
  login: login
}