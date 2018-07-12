export default {
    convertInboundState: (state) => {
        switch (state) {
            case 'receive':
              return 'Chờ nhận'
            case 'received':
              return 'Chờ kiểm'
            case 'inspected':
              return 'Chờ cất'
            case 'done':
              return 'Xong'
            case 'cancel':
              return 'Hủy'
            default:
              return ''
        }
    }
}