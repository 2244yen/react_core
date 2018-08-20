import React, { Component } from 'react';
import apiInbound from '../../services/inbound';

class Detail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      irData: {}
    };
    this.changeStateToReceive = this.changeStateToReceive.bind(this);
    this.edit = this.edit.bind(this);
  }

  changeStateToReceive () {
    if (!window.$.isEmptyObject(this.state.irData) && this.state.irData.state === 'receive') {
      const id = this.props.match.params.id;
      // const data = { state: 'received' }
      if (!this.state.irData.vat) {
        alert('Mã VAT chưa có. Vui lòng cập nhật mã VAT để nhận hàng.');
      } else {
        let formData = new FormData();
        formData.append('state', 'received');
        apiInbound.convertToAnotherState(id, formData).then((response) => {
          console.log(response);
          if (response && response.error_code === 1) {
            alert('Cập nhật thành công!');
            this.props.history.replace('/inbound/' + id);
            this.getDetail();
          }
        }, err => {
          alert(err);
        })
      }
    } else {
      alert('Không thực thi!');
    }
  }

  edit () {
    console.log('edit');
    this.forceUpdate();
  }

  componentDidMount () {
    this.getDetail();
  }

  getDetail () {
    console.log(this.props);
    let id = this.props.match.params.id;
    apiInbound.getDetail(id).then(response => {
      this.setState({ irData: response ? response[0] : {} });
    }, err => {
      alert(err);
    });
  }

  render () {
    const irData = this.state.irData ? this.state.irData : {};
    let moveLines = !window.$.isEmptyObject(irData) && irData.move_lines ? irData.move_lines : [];
    const showML = moveLines.map((product, id) => (
      <tr key={id}>
        <td>{ product.name ?  product.name : '' }</td>
        <td>{ product.g_code ? product.g_code : '' }</td>
        <td>{ product.m_code ? product.m_code[1] : '' }</td>
        <td>{ product.s_code ? product.s_code : '' }</td>
        <td>{ product.product_uom ? product.product_uom['name'] : '' }</td>
        <td>{ product.min_qty ? product.min_qty : '' }</td>
      </tr>
    ))

    return (
      <section className="view-page">
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <button className="btn btn-primary" onClick={this.edit}>Chỉnh sửa</button>
          </div>
        </div>
        <div className="detail">
          <div className="container">
            <h3 className="title">
              Đề nghị nhập hàng
              {
                this.state.irData.state === 'receive' &&
                <button className="btn btn-ghn pull-right" onClick={ this.changeStateToReceive } >Nhận hàng</button>
              }
            </h3>
            <div className="text-info">
              <div className="row">
                <div className="col-md-6">
                  <div className="row form-group">
                    <div className="col-md-4">Mã đề nghị <br /> nhập hàng</div>
                    <div className="col-md-8">{ irData.name ? irData.name : '' }</div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">Mã đơn <br /> đặt hàng</div>
                    <div className="col-md-8">{ irData.origin ? irData.origin : '' }</div>
                  </div>
                  <div className="row form-group"> 
                    <div className="col-md-4">Seller*</div>
                    <div className="col-md-8">
                      {/* <p>{ irData.partner_id && irData.partner_id[0] ? irData.partner_id[0].display_name : '' }</p>
                      <p>{ irData.partner_id && irData.partner_id[0] ? irData.partner_id[0].contact.name : ''}</p>
                      <p>{ irData.partner_id && irData.partner_id[0] ? irData.partner_id[0].phone : '' }</p>
                      <p></p> */}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">Nhà cung cấp*</div>
                    <div className="col-md-8">{ irData.supplier_id ? irData.supplier_id[1] : '' }</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row form-group">
                    <div className="col-md-4">Ngày nhập <br /> dự kiến*</div>
                    <div className="col-md-8" >{ irData.min_date ? irData.min_date : '' }</div>
                  </div>
                  <div className="row form-group"> 
                    <div className="col-md-4">Kho đến*</div>
                    <div className="col-md-8">
                      <p>{ irData.picking_type_id ? irData.picking_type_id[1] : '' }</p>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">Người giao*</div>
                    <div className="col-md-8">{ irData.deliver_ir ? irData.deliver_ir : '' }</div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">Mã hóa đơn <br /> VAT</div>
                    <div className="col-md-8">{ irData.vat ? irData.vat : '' }</div>
                  </div>
                </div>
              </div>        
            </div>
            <div className="row table-view">
              <div className="col-md-12">
                <span className="tab-name">Danh sách sản phẩm</span>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>G-code</th>
                      <th>M-code</th>
                      <th>S-code</th>
                      <th>Đơn vị tính</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    { showML }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row form-group attachment">
                  <p className="attachment-file">Đính kèm tài liệu</p>
                  <div className="attachment-mask"></div>
                  <input type="file" name="attachment" />
                </div>
                <div className="row form-group">
                  <div className="col-md-4">Ghi chú</div>
                  <div className="col-md-8">{ irData.note ?  irData.note : '' }</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
}

export default Detail;