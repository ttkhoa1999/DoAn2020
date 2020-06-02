import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DanhSachDoAn_Admin from '../DanhSachDoAn_Admin';
import Cookies from 'universal-cookie';


class QuanLyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : []
        }
        const cookie = new Cookies();
        this.id = cookie.get('id') !== 'undefined' ? true : false;
    }
    componentDidMount(){
      const {history} = this.props;
        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/topics',
            data : null,
            withCredentials: true,
        }).then(res => {
          if(res.data === 0){
            history.push('');
          }
          else {
            console.log(res.data);
            this.setState({
              danhsach : res.data
            })
          }
        })
      }

      onClickS = (id, ngayNop) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics',
          data : {
            id : id,
            ngayNop : ngayNop,
          }
        }).then(res => {
          console.log(res.data);
          this.componentDidMount();
        })
      }

      onClickP = (id, phong) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/p',
          data : {
            id : id,
            phong : phong,
          }
        }).then(res => {
          console.log(res.data);
          this.componentDidMount();
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
                  {this.id ? <Link to={'/ThongTin'} type="button" className="btn btn-default cy bd ml-5">Quay lại</Link> : ''}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên đồ án</th>
                                <th>Nền tảng</th>
                                <th className={"w1"}>Mô tả</th>
                                <th>Số người</th>
                                {
                                  this.id ? '' :
                                  <th>Ngày báo cáo</th>
                                }
                                {
                                  this.id ? '' :
                                  <th>Phòng</th>
                                }
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
                  onClickS={this.onClickS}
                  onClickP={this.onClickP}
                />
            );
        });
    }
    return resuft;
}
  
}

export default QuanLyDoAn;