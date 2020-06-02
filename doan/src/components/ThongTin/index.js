import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ThongTin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ds : [],
      isGV : false,
      ten : '',
    }
  }
  
  componentDidMount(){
    axios({
        method : 'GET',
        url : 'http://localhost:4000/users/TT',
        data : null,
        withCredentials: true
    }).then(res => {
      console.log(res.data);
      this.setState({
        ds: res.data[0].topic,
        isGV : res.data[0].isGV,
        ten : res.data[0].ten,
      })
    })
  }
  
  
  render() {
    return (
      <div className="st">
        <div className="mb-15">
          {this.state.isGV ? <Link to={'/QuanLyDoAn'} type="button" className="btn btn-success cy bd ">Quản lý đồ án</Link> : ''}
          <p className="btn btn-success cy bd ml-10 fr">Xin chào {this.state.isGV ? 'giáo viên' : 'sinh viên'} {this.state.ten}</p> 
          </div>
        {this.state.ds.map((item, index) => {
                return <div className="panel panel-danger" key={index}>
                          <div className="panel-heading">
                              <h3 className="panel-title">Thông tin chi tiết đồ án</h3>
                          </div>
                          <div className="panel-body">
                              <h4>Tên đồ án: {this.state.ds[index].tenDoAn}</h4>
                              <h4>Nền tảng: {this.state.ds[index].nenTang} </h4>
                              <h4>Mô tả: {this.state.ds[index].moTa} </h4>
                              <h4>Ngày báo cáo: {this.state.ds[index].ngayNop === 'Invalid date' ? 'Chưa cập nhập' : this.state.ds[index].ngayNop} </h4>
                              <h4>Phòng: {this.state.ds[index].phong === null ? 'Chưa cập nhập' : this.state.ds[index].phong} </h4>
                              <h4>Thành viên: 
                                {this.state.ds[index].user.map((item) => {
                                  if(item.isGV === false){
                                  return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                                  }
                                })}
                              </h4>
                              <h4>Giáo viên hướng dẫn: 
                                {this.state.ds[index].user.map((item) => {
                                  if(item.isGV === true){
                                  return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                                  }
                                })}
                              </h4>
                          </div>
                </div>    
          })
        }
          
      </div>
    );
  }
  
}

export default ThongTin;