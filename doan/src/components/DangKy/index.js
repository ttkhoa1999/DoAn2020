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
                isGV : this.state.isGV,
            }
        }).then(res => {
            console.log(res);
            if(res.data === 'da ton tai')
             alert('Email đã đăng ký, vui lòng nhập email mới');
            else {
                alert('Đăng ký thành công');
                const cookies = new Cookies();
                cookies.set('id', res.data.id, { path: '/' });
                history.push('/DangKyDoAn');
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
                                <input type="email" className="form-control" name="email" placeholder="email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" className="form-control" name="password" placeholder="password"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input type="text" className="form-control" name="ten" placeholder="Họ và tên"  onChange={this.onChange}/>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="isGV" value={this.state.isGV} defaultChecked={this.state.isGV} onChange={this.onChange}/>
                                    Giáo viên
                                </label>
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