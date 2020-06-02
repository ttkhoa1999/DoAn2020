import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



class DangKy extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            ten : '',
            ma : '',
            maGV : '',
            isGV : false,
        }
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }
    
    onClick = () => {
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users/send',
            data : {
                email : this.state.email,
            }
        }).then(res => {
            if(res.data === 'da ton tai')
             alert('Email đã đăng ký, vui lòng nhập email mới');
            if(res.data === 1){
                alert('Mã xác nhận đã được gửi tới email: '+ this.state.email);
            }
        })
    }

    onSubmit = (e) => {
        const {history} = this.props;
        e.preventDefault();
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users/dk',
            data : {
                email : this.state.email,
                password : this.state.password,
                ten : this.state.ten,
                ma : this.state.ma,
                maGV : this.state.maGV,
                isGV : this.state.isGV,
            }
        }).then(res => {
            console.log(res);
            if(res.data === 'nhap ma')
             alert('Bạn chưa nhập mã đăng ký');
            else {
                if(res.data === 'ma sai')
                    alert('Mã đăng ký không đúng, vui lòng nhập lại');
                    else {
                        if(res.data === 'sai maGV' || this.state.maGV === ''){
                            alert('Mã giáo viên không đúng, vui lòng nhập lại');
                           }
                           else {
                               alert('Đăng ký thành công');
                               const cookies = new Cookies();
                               if(res.data.message === '1'){
                                   cookies.set('id', res.data.result.id, { path: '/' });
                                   history.push('/ThongTin');
                               }
                               else {
                                   cookies.set('id', res.data.id, { path: '/' });
                                   history.push('/DangKyDoAn');
                               }
                           }
                    }         
            }   
        })
    }   

  render() {
    return (
        <div className="row">
            <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Đăng ký</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="password"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input type="text" className="form-control" name="ten" placeholder="Họ và tên"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Mã đăng ký</label>
                                <div className="flex">
                                    <input type="text" className="form-control w2" name="ma" placeholder="Mã đăng ký"  onChange={this.onChange}/>
                                    <button type="button" className="btn btn-primary ml-5" onClick={this.onClick}>Lấy mã</button>
                                </div>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="isGV" value={this.state.isGV} defaultChecked={this.state.isGV} onChange={this.onChange}/>
                                    Giáo viên
                                </label>
                                {this.state.isGV ? <input type="text" className="form-control w2" name="maGV" placeholder="Mã GV"  onChange={this.onChange}/> : ''}
                            </div>
                            <button type="submit" className="btn btn-primary btc pd">Đăng ký</button>
                        </form> 
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default DangKy;