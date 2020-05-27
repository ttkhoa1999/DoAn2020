import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DanhSachDoAn_Admin from '../DanhSachDoAn_Admin';


class QuanLyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : []
        }
    }
    componentDidMount(){
        axios({
            method : 'GET',
            url : 'http://localhost:4000/topics',
            data : null
        }).then(res => {
          console.log(res);
          this.setState({
            danhsach : res.data
          })
        })
      }

      onDelete = (id) => {
        let {danhsach} = this.state;
        axios({
          method : 'DELETE',
          url : `http://localhost:4000/topics/${id}`,
          data : null
        }).then(res => {
          if(res.status === 200){
            let index = this.findId(danhsach, id);
            console.log(index);
            if(index !== -1){
              danhsach.splice(index, 1);
              this.setState({
                danhsach : danhsach
              })
            }
          }
        })
      }
    
      findId = (danhsach, id) => {
        let resuft = -1;
        danhsach.forEach((ds, index) => {
          if(ds.id === id){
            resuft = index;
          }
        });
        return resuft;
      }

  render() {
      let {danhsach} = this.state;
    return (
      <div>
        <div className="panel panel-danger">
              <div className="panel-heading mc">
                    <h3 className="panel-title">Danh sách đồ án</h3>
              </div>
              <div className="panel-body">
                  <Link to={'/Them'} type="button" className="btn btn-default cy bd">Thêm đồ án</Link>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên đồ án</th>
                                <th>Nền tảng</th>
                                <th className={"w1"}>Mô tả</th>
                                <th>Ngày nộp</th>
                                <th>Số người</th>
                                <th>Giáo viên hướng dẫn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showDanhSach(danhsach)}
                        </tbody>
                    </table>
              </div>
        </div>
      </div>
    );
  }

  showDanhSach(danhsach){
    let resuft = null;
    if(danhsach.length > 0){
        resuft = danhsach.map((ds, index) =>{
            return(
                <DanhSachDoAn_Admin
                  key={index}
                  ds={ds}
                  index={index}
                  onDelete={this.onDelete}
                />
            );
        });
    }
    return resuft;
}
  
}

export default QuanLyDoAn;