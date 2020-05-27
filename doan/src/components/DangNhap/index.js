import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';



class DangKy extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
        }
    }

    onChange = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        axios({
            method : 'POST',
            url : 'http://localhost:4000/users',
            data : {
                email : this.state.email,
                password : this.state.password,
            },
        }).then(res => {
            console.log(res);
            if(res.data === 0)
                alert('Email chưa được đăng ký');
            else if(res.data === 1)
                    alert('Email hoặc mật khẩu chưa chính xác');
                 else {
                     if(res.data.admin === 1){
                        history.push(res.data.message);
                     }else {
                        const cookies = new Cookies();
                        cookies.set('id', res.data.kt, { path: '/' });
                        history.push(res.data.message);
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
                            <h3 className="panel-title mc">Đăng nhập</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" placeholder="email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" className="form-control" name="password" placeholder="password"  onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-primary btc pd">Đăng nhập</button><br />
                            <Link to='/Dangky'>Nhấn vào đây để đăng ký</Link>
                        </form> 
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default DangKy;