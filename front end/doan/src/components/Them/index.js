import React, { Component } from 'react';
import axios from 'axios';




class ThemDoAn extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenDoAn : '',
            nenTang : '',
            moTa : '',
            ngayNop : '',
            ngDK : '',
        }
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        e.preventDefault();
        axios({
            method : 'POST',
            url : 'http://localhost:4000/topics/Them',
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                moTa : this.state.moTa,
                ngayNop : this.state.ngayNop,
                ngDK : this.state.ngDK,
            }
        }).then(res => {
            if(res.data){
                alert('Thêm đồ án thàng công');
                history.push('/QuanLyDoAn');
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }
  render() {
    return (
        <div className="row">
            <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Thêm đồ án</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên</label>
                                <input type="text" className="form-control" name="tenDoAn" placeholder="Tên đồ án" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Nền tảng</label>
                                <input type="text" className="form-control" name="nenTang" placeholder="Nền tảng"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea type="text" className="form-control" name="moTa" placeholder="Mô tả"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Ngày nộp</label>
                                <input type="date" className="form-control" name="ngayNop" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Số lượng</label>
                                <input type="number" min='1' max='3' className="form-control" name="ngDK" onChange={this.onChange}/>
                            </div>
             
                            <button type="submit" className="btn btn-primary mt btc">Thêm</button>
                        </form> 
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default ThemDoAn;