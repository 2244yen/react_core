import axios from 'axios';

class Api {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
    axios.defaults.headers.common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  getHeaders () {
    return {
      emulateJSON: true
    }
  }

  get (route) {
    return Promise((resolve, reject) => {
      axios.get(this.baseUrl + route, this.getHeader()).then(res => {
        resolve(res.data)
      }, (res) => {
        reject(res.data)
      })
    })
  }

  post (route, data) {
    return Promise((resolve, reject) => {
      axios.post(this.baseUrl + route, data, this.getHeader()).then(res => {
        resolve(res.data)
      }, (res) => {
        reject(res.data)
      })
    })
  }
}

export default Api;