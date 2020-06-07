import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DanhSachDoAn_Admin from '../DanhSachDoAn_Admin';
import Cookies from 'universal-cookie';
import Order from '../Order';


class QuanLyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : [],
          ten : '',
          s : false,
          infor : '',
          o : false,
          ngTao : '',
        }
        const cookie = new Cookies();
        this.id = cookie.get('id') !== 'admin' ? true : false;
        this.ngTao = cookie.get('id');
    }
    componentDidMount(){
      const {history} = this.props;
        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/topics',
            data : null,
            withCredentials: true,
        }).then(res => {
          console.log(res.data.data.topic);
          if(res.data === 0){
            history.push('');
          }
          else {
            console.log(this.id);
            if(!this.id){
              this.setState({
                danhsach : res.data.data,
                ten : res.data.message,
              })
            }
            else {
              this.setState({
                danhsach : res.data.data.topic,
                ten : res.data.message,
              })
            }
          }
        })
        axios({ 
          method : 'GET',
          url : 'http://localhost:4000/orders',
          data : null,
          withCredentials: true,
        }).then(res => {
          if(res.data.length !== 0){
            this.setState({
              o : !this.state.o,
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

      onClickI = (id) => {
        axios({
          method : 'POST',
          url : 'http://localhost:4000/topics/TTID',
          data : {
            id : id,
          }
      }).then(res => {
        this.setState({
          infor : res.data,
          s : true,
        })
        console.log(this.state.infor);
      })
      }

      onClickD = () => {
        this.setState({
          s : false,
        })
      }

      onDelete = (id, ngTao) => {
        console.log(ngTao, this.ngTao);
        if(ngTao == this.ngTao || !this.id){
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
        else alert('Bạn không thể xóa đồ án');
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
      this.name = this.state.ten === 'admin' ? true : false;
      let {danhsach} = this.state;
    return (
      <div className="st">
        <div className="mb-15">
          <p className="btn btn-success cy bd ml-10 fr">Xin chào {this.name ? '' : 'giáo viên'} {this.state.ten}</p> 
        </div>
        {
          this.state.o ? 
            <Order />
          : ''
        }
        {
          this.state.s ? 
            <div className="panel panel-primary">
                <div className="panel-heading flex">
                    <h3 className="panel-title">Thông tin chi tiết đồ án</h3>
                    <button type="button" class="btn btn-lg btn-danger fx xx wcn" onClick={this.onClickD}>X</button>
                </div>
                <div className="panel-body">
                    <h4>Tên đồ án: {this.state.infor.tenDoAn}</h4>
                    <h4>Nền tảng: {this.state.infor.nenTang} </h4>
                    <h4>Mô tả: {this.state.infor.moTa} </h4>
                    <h4>Ngày báo cáo: {this.state.infor.ngayNop === 'Invalid date' ? 'Chưa cập nhập' : this.state.infor.ngayNop} </h4>
                    <h4>Phòng: {this.state.infor.phong === null ? 'Chưa cập nhập' : this.state.infor.phong} </h4>
                    <h4>Thành viên: 
                      {this.state.infor.user.map((item) => {
                        if(item.isGV === false){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                        }
                      })}
                    </h4>
                    <h4>Giáo viên hướng dẫn: 
                      {this.state.infor.user.map((item) => {
                        if(item.isGV === true){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.mssv}@dlu.edu.vn</p>
                        }
                      })}
                    </h4>
                </div>
              </div>
          : ''   
        }
        <div className="panel panel-danger">
              <div className="panel-heading mc">
                    <h3 className="panel-title">Danh sách đồ án</h3>
              </div>
              <div className="panel-body">
                  <Link to={'/Them'} type="button" className="btn btn-default cy bd">Thêm đồ án</Link>
                  {/* {this.id ? <Link to={'/ThongTin'} type="button" className="btn btn-default cy bd ml-5">Quay lại</Link> : ''} */}
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
                  onClickI={this.onClickI}
                />
            );
        });
    }
    return resuft;
}
  
}

export default QuanLyDoAn;