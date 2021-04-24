import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Order from '../Order';
import Logo from '../../images/logo.jpg';
import New from '../../images/new.png';




class CapNhat extends Component{
    constructor(props){
        super(props);
        this.state = {
            ten : 'admin',
            isSV : false,
            o : false,
            op : false,
            phong : '',
            loai : 'Đồ án cơ sở',
          }
    }

    onChange = ({target}) => {
        this.setState({
          [target.name] : target.value
      })
    }

    onClick = () => {
        this.setState({
            op : !this.state.op
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
            alert('Cập nhập ngày thành công');
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
        alert('Cập nhập phòng thành công');
    })
    }

    componentDidMount(){
        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/TT',
            data : null,
            withCredentials: true
        }).then(res => {
          if (res.data.length != 0) {
            this.setState({
                ten : res.data[0].ten,
            })
            if (res.data[0].isGV == false) {
                this.setState({
                    isSV : true
                })
              }
          }
        })

        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/orders/tb',
            data : null,
            withCredentials: true,
          }).then(res => {
            
            res.data.map((item, index) => {
              if(item.ck === 0){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Giáo viên " + res.data[0].ten + " đã từ chối tham gia hướng dẫn đồ án " + this.state.tenDA);
                })
  
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
              if(item.ck === 1){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Giáo viên " + res.data[0].ten + " đã đồng ý tham gia hướng dẫn đồ án " + this.state.tenDA);
                })
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
            })
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


  render() {
    return (
        <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            {
                this.state.op ? 
                    <Order />
                : ''
            }

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-md-3 col-sx-3 col-sm-3 col-lg-3">
                        <div class="accordion ">
                            <div class="accordion-group khungt">
                                {
                                    this.state.ten == 'admin' 
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/QLND'}>Quản lý người dùng</Link>
                                        </div>
                                    : ''
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    this.state.ten == 'admin' 
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/LuaChon'}>Loại đồ án</Link>
                                        </div>
                                    : ''
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    this.state.ten == 'admin' 
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/TaoThongBao'}>Tạo thông báo</Link>
                                        </div>
                                    :   <div>
                                        { this.state.isSV 
                                            ? ''
                                            :   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                                    <button style={{fontSize: '15px', border: 'none', backgroundColor: 'rgba(16, 163, 23, 0.9)', color: 'white', fontSize: '20px'}} onClick={this.onClick}>Lời mời</button>
                                                    {
                                                        this.state.o 
                                                        ? <img style={{width: '15%',float: 'right'}}  src={New} />
                                                        : ''
                                                    }
                                                </div>
                                            }
                                        </div>
                                }
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#">Tài liệu tham khảo</a>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <p className="xc">Xin chào {this.state.ten}</p> 
                                    {/* {this.state.isGV ? 'giáo viên' : 'sinh viên'} */}
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <Link to='/'>Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="divmain">
                            <div class="bgtitle">Cập nhập ngày và phòng báo cáo</div>
                            <div className=" col-lg-13 allk " style={{marginTop: "2%"}}>
                                
                                <div style={{width: '48%', backgroundColor: "lightgray"}}>
                                    <div>
                                        <h2 style={{backgroundColor: "rgba(7, 126, 13, 0.9)", textAlign: 'center', margin: '0 0', padding: '10px 5px', color:'white', fontWeight:'bold'}}>Ngày báo cáo</h2>
                                        <div className="form-group" style={{margin:'15px'}}>
                                          <p style={{padding: '10px 5px'}}>Loại đồ án</p>
                                          <select className="form-control" name="loai" onChange={this.onChange} Value={this.state.loai}>
                                              <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                                              <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                                              <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                                              <option value="Khóa luận">Khóa luận</option>
                                          </select>
                                        </div>
                                        <input type="date" name="ngayNop" id="input" className="form-control" style={{margin:'15px', width:'94%'}} onChange={this.onChange} value={this.state.ngayNop} required="required" title="" />
                                        <button type="button" className="btn btn-info centers" onClick={this.onClickAllSaveN}>Save</button>
                                      </div>
                                </div>

                                <div style={{width: '48%', backgroundColor: "lightgray", marginLeft: "4%"}}>
                                    <div> 
                                        <h2 style={{backgroundColor: "rgba(7, 126, 13, 0.9)", textAlign: 'center', margin: '0 0', padding: '10px 5px', color:'white', fontWeight:'bold'}} >Phòng báo cáo</h2>
                                        <div className="form-group" style={{margin:'15px'}}>
                                          <p style={{padding: '10px 5px'}}>Loại đồ án</p>
                                          <select className="form-control" name="loai" onChange={this.onChange} Value={this.state.loai}>
                                              <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                                              <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                                              <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                                              <option value="Khóa luận">Khóa luận</option>
                                          </select>
                                      </div>
                                        <input  type="text" name="phong" id="input" className="form-control" style={{margin:'15px', width:'94%'}} onChange={this.onChange} value={this.state.phong} required="required" title="" />
                                        <button type="button" className="btn btn-info centers" onClick={this.onClickAllSaveP}>Save</button>
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
  
}

export default CapNhat;