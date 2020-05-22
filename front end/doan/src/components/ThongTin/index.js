import React, { Component } from 'react';
import axios from 'axios';

class ThongTin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ds : [],
    }
  }
  
  componentDidMount(){
    axios({
        method : 'GET',
        url : 'http://localhost:4000/users/TT',
        data : null,
        withCredentials: true
    }).then(res => {
      this.setState({
        ds: res.data[0].topic,
      })
    })
  }
  
  render() {
    return (
      <div>
        {this.state.ds.map((item, index) => {
                return <div className="panel panel-danger" key={index}>
                          <div className="panel-heading">
                              <h3 className="panel-title">Thông tin chi tiết đồ án</h3>
                          </div>
                          <div className="panel-body">
                              <h4>Tên đồ án: {this.state.ds[index].tenDoAn}</h4>
                              <h4>Nền tảng: {this.state.ds[index].nenTang} </h4>
                              <h4>Mô tả: {this.state.ds[index].moTa} </h4>
                              <h4>Ngày nộp: {this.state.ds[index].ngayNop} </h4>
                              <h4>Thành viên: 
                                {this.state.ds[index].user.map((item) => {
                                  if(item.isGV === false){
                                  return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}</p>
                                  }
                                })}
                              </h4>
                              <h4>Giáo viên hướng dẫn: 
                                {this.state.ds[index].user.map((item) => {
                                  if(item.isGV === true){
                                  return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}</p>
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