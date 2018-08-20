import api from '../api';

const error = 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';

var getList = (data = {}) => {
  let link = '';
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      if (data[item]) {
        link += item + '=' + data[item] + '&';
      }
    }
  }
  console.log('links', link);
  return new Promise((resolve, reject) => {
    api.server.get('/inbound_requests?' + link).then((response) => {
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
      console.log(response);
      resolve(response.data)
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