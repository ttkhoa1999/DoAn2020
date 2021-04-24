import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DanhSachDoAnAdmin from '../DanhSachDoAnAdmin';
import Cookies from 'universal-cookie';
import Logo from '../../images/logo.jpg';


class QuanLyDoAn extends Component{
    constructor(props){
        super(props);
        this.state =  {
          danhsach : [],
          ten : '',
          s : false,
          infor : '',
          ngTao : '',
          n : false,
          p : false,
          di : false,
          ngayNop : '',
          phong : '',
          loai : 'Đồ án cơ sở',
          lan1 : '',
          lan2 : '',
          lan3 : '',
          idUser : '',
          tenDA : '',
          idLoai : '',
          cp : false,
          ng : false,
        }
        const cookie = new Cookies();
        this.id = cookie.get('id') !== 'admin' ? true : false;
        this.ngTao = cookie.get('id');
        this.id1 = cookie.get('id');
    }
    componentDidMount(){
      const {history, match} = this.props;
      let {id} = match.params;
      this.setState({
        idLoai : id
      })
        axios({ 
            method : 'GET',
            url : `http://localhost:4000/topics/${id}`,
            data : null,
            withCredentials: true,
        }).then(res => {
          if(res.data === 0){
            history.push('');
          }
          else {
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

      }

      onDeleteGV = (idGV, id, ngTao) => {
        const {ds} = this.props;
        if(ngTao === null){
          if(this.id1 == idGV || !this.id){
            if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
              axios({
                method : 'DELETE',
                url : `http://localhost:4000/users/${idGV}`,
                data : {
                  idTopic : id,
                }
              }).then(res => {
                if(res.status === 200){
                  let index = this.findId(ds.user, idGV);
                  console.log(index);
                  if(index !== -1){
                    ds.user.splice(index, 1);
                    this.setState({
                      ds : this.ds
                    })
                  }
                }
              })
              window.location.reload(false);
            }
          }
          else alert('Bạn không thể xóa');
        }
        else {
          if(ngTao !== idGV || !this.id){
            if(confirm('Bạn có chắc chắn muốn xóa không ?')){ //eslint-disable-line
              axios({
                method : 'DELETE',
                url : `http://localhost:4000/users/${idGV}`,
                data : {
                  idTopic : id,
                }
              }).then(res => {
                if(res.status === 200){
                  let index = this.findId(ds.user, idGV);
                  console.log(index);
                  if(index !== -1){
                    ds.user.splice(index, 1);
                    this.setState({
                      ds : this.ds
                    })
                  }
                }
              })
              window.location.reload(false);
            }
          }
          else alert('Bạn không thể xóa');
        }
      }

      onClickChangeP = () => {
        this.setState({
          cp : !this.state.cp,
        })
      }
    
      onClickChangeN = () => {
        this.setState({
          ng : !this.state.ng,
        })
      }

      onClickS = (id) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics',
          data : {
            id : id,
            ngayNop : this.state.ngayNop,
          }
        }).then(res => {
          this.setState({
            ng : !this.state.ng,
          })
          this.onClickI(id);
          this.componentDidMount();
        })
      }

      onChange = ({target}) => {
        this.setState({
          [target.name] : target.value
      })
      }

      onClickP = (id) => {
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/p',
          data : {
            id : id,
            phong : this.state.phong,
          }
        }).then(res => {
          this.setState({
            cp : !this.state.cp,
          })
          this.onClickI(id);
          this.componentDidMount();
        })
      }

      onClickI = (id) => {
        axios({
          method : 'POST',
          url : `http://localhost:4000/topics/${this.state.idLoai}/TTID`,
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
        if(ngTao === this.ngTao || !this.id){
          axios({
            method : 'POST',
            url : `http://localhost:4000/topics/${this.state.idLoai}/TTID`,
            data : {
              id : id,
            }
          }).then(res => {
            if(res.data.user.length !== 0){
              if(confirm('Đã có sinh viên đăng ký đề tài, bạn có chắc chắn muốn xóa ?')){ //eslint-disable-line
                let {danhsach} = this.state;
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/topics/${this.state.idLoai}/${id}`,
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
            }
            else {
                let {danhsach} = this.state;
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/topics/${this.state.idLoai}/${id}`,
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
            })
        }
        else alert('Bạn không thể xóa đồ án');
      }

      onClickALLN = () => {
        this.setState({
          n : !this.state.n,
        })
      }

      onClickALLP = () => {
        this.setState({
          p : !this.state.p,
        })
      }

      onClickDi = () => {
        this.setState({
          di : !this.state.di,
        })
      }

      onClickDS = (id, lan) => {
        let diem;
        this.setState({
          di : !this.state.di
        })
        if(lan === 1)
            diem = this.state.lan1;
        if(lan === 2)
            diem = this.state.lan2;
        if(lan === 3)
            diem = this.state.lan3;
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/diem',
          data : {
            id : id,
            lan : lan,
            diem : diem,
          }
        }).then(res => {
          this.onClickI(id);
          this.componentDidMount();
        })
      }

      onClickAllSaveN = () => {
        this.setState({
          n : !this.state.n
        })
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/ngay',
          data : {
            loai : this.state.loai,
            ngayNop : this.state.ngayNop,
          }
        }).then(res => {
          this.componentDidMount();
        })
      }

      onClickAllSaveP = () => {
        this.setState({
          p : !this.state.p
        })
        axios({
          method : 'PUT',
          url : 'http://localhost:4000/topics/phong',
          data : {
            loai : this.state.loai,
            phong : this.state.phong,
          }
        }).then(res => {
          this.componentDidMount();
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
      this.name = this.state.ten === 'admin' ? true : false;
      let {danhsach} = this.state;
    return (

      <div className="st">

      <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-lg-12">
                        <div class="divmain cc">
                            <div class="bgtitle" style={{textAlign: 'center', fontSize: '20px'}}>Danh sách
                            <Link to={'/LuaChon'} type="button" className="btn btn-success" style={{float: 'left', marginTop: '-0.5%', width: 'auto'}}>Quay lại</Link>                              
                            </div>
                            <div className=" col-lg-13 ">
        {
          this.state.s ? 
            <div className="panel panel-primary" style={{marginTop: '10px'}}>
                <div className="panel-heading flex">
                    <h3 className="panel-title" style={{width: '200px'}}>Thông tin chi tiết</h3>
                    <button type="button" class="btn btn-lg btn-danger fx xx wcn" onClick={this.onClickD}>X</button>
                </div>
                <div className="panel-body" style={{marginLeft: '10px'}}>
                    <h4>Tên đồ án: {this.state.infor.tenDoAn}</h4>
                    <h4>Nền tảng: {this.state.infor.nenTang} </h4>
                    <h4>Loại đồ án: {this.state.infor.loai} </h4>
                    <h4>Mô tả: {this.state.infor.moTa} </h4>
                    <h4>Ngày báo cáo: {this.state.infor.ngayNop === 'Invalid date' ? 'Chưa cập nhật' : this.state.infor.ngayNop} 
                      <button type="button" className="btn btn-warning f fz" onClick={this.onClickChangeN}>CN</button>
                      {this.state.ng ? 
                        <div>
                          <input type="date" name="ngayNop" id="input" className="form-control" onChange={this.onChange} value={this.state.ngayNop} required="required" title="" />
                          <button type="button" className="btn btn-danger" onClick={() => this.onClickS(this.state.infor.id)}>save</button>
                        </div>
                        :
                        ''
                      }
                    </h4>
                    <h4>Phòng: {this.state.infor.phong === null ? 'Chưa cập nhật' : this.state.infor.phong} 
                      <button type="button" className="btn btn-warning f fz" onClick={this.onClickChangeP}>CN</button>
                      {this.state.cp ? 
                        <div>
                          <input type="text" name="phong" id="input" className="form-control" onChange={this.onChange} value={this.state.phong} required="required" title="" />
                          <button type="button" className="btn btn-danger" onClick={() => this.onClickP(this.state.infor.id)}>save</button>
                        </div>
                        :
                        ''
                      }
                    </h4>
                    <h4>Thành viên: 
                      {this.state.infor.user.map((item) => {
                        if(item.isGV === false){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}</p>
                        }
                      })}
                    </h4>
                    <h4>Giảng viên hướng dẫn:
                      <Link to={`/${this.state.idLoai}/${this.state.infor.id}/tgv`}type="button" className="btn btn-primary f fz" >Mời</Link> 
                      {this.state.infor.user.map((item, index) => {
                        if(item.isGV === true){
                        return  <p className="ml-10 mt-5" key={item.id}>Tên: {item.ten}, Email: {item.email}
                                    <button type="button" className="btn btn-warning ml-10 f" onClick={() => this.onDeleteGV(this.state.infor.user[index].id, this.state.infor.id, this.state.infor.ngTao)}>-</button>
                                </p>
                        }
                      })}
                    </h4>
                    <h4>
                      <div className="flex">
                        <div >
                          Điểm lần 1: {this.state.infor.lan1 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan1}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div style={{margin:'5px'}}>
                                    <input type="text" name="lan1" id="input" className="form-control" onChange={this.onChange} value={this.state.lan1} required="required" title="" />
                                    <button style={{margin:'2% 37%'}} type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 1)}>Save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>
                        <div className="ml-10">
                          Điểm lần 2: {this.state.infor.lan2 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan2}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div style={{margin:'5px'}}>
                                    <input type="text" name="lan2" id="input" className="form-control" onChange={this.onChange} value={this.state.lan2} required="required" title="" />
                                    <button style={{margin:'2% 37%'}} type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 2)}>save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>
                        <div className="ml-10">
                          Điểm lần 3: {this.state.infor.lan3 === null ?
                          'Chưa cập nhật'
                          : this.state.infor.lan3}
                          <div className="fr ml-5">
                            <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClickDi}>CN</button>
                                {this.state.di ? 
                                  <div style={{margin:'5px'}}>
                                    <input type="text" name="lan3" id="input" className="form-control" onChange={this.onChange} value={this.state.lan3} required="required" title="" />
                                    <button style={{margin:'2% 37%'}} type="button" className="btn btn-danger" onClick={() => this.onClickDS(this.state.infor.id, 3)}>save</button>
                                  </div>
                                  :
                                  ''
                                }
                          </div>
                        </div>  
                        <div className="ml-10">
                          Điểm tổng kết: {(this.state.infor.lan1 === null || this.state.infor.lan2 === null || this.state.infor.lan3 === null) ?
                          'Chưa cập nhật'
                          : Math.round((this.state.infor.lan1 * 0.2 + this.state.infor.lan2 * 0.2 + this.state.infor.lan3 * 0.6) * 100) / 100}
                        </div>   
                      </div>               
                    </h4>
                </div>
              </div>
          : ''   
        }
        <div className="panel panel-danger ds1" style={{marginTop:'10px'}}>
              <div className="panel-body" style={{margin:'10px'}}>
                  {/* {this.id ? <Link to={'/ThongTin'} type="button" className="btn btn-default cy bd ml-5">Quay lại</Link> : ''} */}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên đồ án</th>
                                <th>Nền tảng</th>
                                <th>Loại đồ án</th>
                                <th className={"w1"}>Mô tả</th>
                                <th>Số người</th>
                                {
                                  this.id ? '' :
                                  <th style={{width: '100px'}}>Ngày báo cáo</th>
                                }
                                {
                                  this.id ? '' :
                                  <th style={{width: '10px'}}>Phòng</th>
                                }
                                <th style={{width: '250px'}}>Giảng viên hướng dẫn</th>
                                <th >
                                  <Link style={{display: "flex", justifyContent: "center"}} to={`/Them/${this.state.idLoai}`} type="button" className="btn btn-default btnAdd">Thêm đồ án</Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showDanhSach(danhsach)}
                        </tbody>
                    </table>
              </div>
        </div>
      </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid padding">	
                    <div class="row text-center padding">
                        <div class="col-12">
                            <h2>Contact us</h2>
                        </div>
                        <div className="col-12 social padding">
                            <a href="#"><i className="fab fa-facebook" /></a>
                            <a href="#"><i className="fab fa-twitter" /></a>
                            <a href="#"><i className="fab fa-google-plus-g" /></a>
                            <a href="#"><i className="fab fa-instagram" /></a>
                            <a href="#"><i className="fab fa-youtube" /></a>
                        </div>
                    </div>
                </div>	
                <footer>
                    
                </footer>
            </div>
        </div>

    );
  }

  showDanhSach(danhsach){
    let resuft = null;
    if(danhsach.length > 0){
        resuft = danhsach.map((ds, index) =>{
            return(
                <DanhSachDoAnAdmin
                  key={index}
                  ds={ds}
                  idLoai = {this.state.idLoai}
                  index={index}
                  onDelete={this.onDelete}
                  onClickI={this.onClickI}
                />
            );
        });
    }
    return resuft;
}
  
}

export default QuanLyDoAn;