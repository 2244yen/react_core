import React, { Component } from 'react';
import apiInbound from '../../services/inbound';
import { Link } from 'react-router-dom';
import filter from '../../common/filter';
import Pagination from '../Common/Pagination';

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      irList: {},
      dataFilter: {
        page: 1,
        limit: 30
      }
    }
  }

  componentDidMount () {
    this.getList(this.state.dataFilter);
  }

  goChangedPage = (page) => {
    const data = this.state.dataFilter;
    data.page = page;
    this.setState({ dataFilter: data});
    console.log(data);
    this.getList(data);
  }

  getList (dataFilter) {
    apiInbound.getList(dataFilter).then(response => {
      this.setState({ irList: response });
      // console.log(this.state.irList);
    }, err => {
      alert(err);
    })
  }

  render () {
    const irList = !window.$.isEmptyObject(this.state.irList) && this.state.irList.records ? this.state.irList.records : [];
    const totalRecords = !window.$.isEmptyObject(this.state.irList) && this.state.irList.total_record_count ? this.state.irList.total_record_count : 0;
    const listIr = irList.map((item, i) => (
      <tr key={i}>
        <td><Link to={{ pathname: '/inbound/' + item.id }}>{ item.name }</Link></td>
        <td>{ item.origin }</td>
        <td>{ window.moment(item.create_date).format('DD/MM/YYY') }</td>
        <td>{ item.partner_id.name }</td>
        <td>{ item.min_date }</td>
        <td>{ item.ware_house.name }</td>
        <td>{ filter.convertInboundState(item.state) }</td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="text-left">
              <h3 className="ghn-title">Đề nghị nhập hàng</h3>
            </div>
          </div>
        </div>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Mã đề nghị nhập hàng</th>
                <th>Mã đơn đặt hàng</th>
                <th>Ngày tạo</th>
                <th>Seller</th>
                <th>Ngày nhận dự kiến</th>
                <th>Kho nhận</th>
                <th>Trạng thái đơn</th>
              </tr>
            </thead>
            <tbody>
              { listIr }
            </tbody>
          </table>
          {
            totalRecords &&
            <Pagination totalRecords={ totalRecords } goChangedPage ={ this.goChangedPage } />
          }
          
        </div>
      </div>
    );
  }
}

export default List;