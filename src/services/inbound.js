import api from '../api';

const error = 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';

var getList = () => {
  return new Promise((resolve, reject) => {
    api.server.get('/inbound_requests?limit=30&page=1').then((response) => {
      resolve(response.data)
    }, (response) => {
      reject(error)
    })
  })
}

export default {
  getList: getList
}