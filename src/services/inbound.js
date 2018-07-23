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

var getDetail = (id) => {
  return new Promise((resolve, reject) => {
    api.server.get('/inbound_requests/'.concat(id)).then((response) => {
      resolve(response.data)
    }, (response) => {
      reject(error)
    })
  })
}

var convertToAnotherState = (id, state) => {
  return new Promise((resolve, reject) => {
    api.server.put('/change_state/' + id, state).then((response) => {
      resolve(response.body)
    }, (response) => {
      reject(error)
    })
  })
}

export default {
  getList: getList,
  getDetail: getDetail,
  convertToAnotherState: convertToAnotherState
}