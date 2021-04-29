import React, { Component } from 'react';
import axios from 'axios';



class ThemDoAn extends Component{
    constructor(props){
        super(props);
        this.state = {
            tenDoAn : '',
            nenTang : '',
            loai : 'Đồ án cơ sở',
            moTa : '',
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
        const {history, match} = this.props;
        let {id} = match.params;
        e.preventDefault();
        axios({
            method : 'POST',
            url : `http://localhost:4000/topics/Them/${id}`,
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                loai : this.state.loai,
                moTa : this.state.moTa,
                ngDK : this.state.ngDK,
            },
            withCredentials: true
        }).then(res => {
            if(res.data){
                alert('Thêm đồ án thàng công');
                history.push(`/QuanLyDoAn/${id}`);
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }
  render() {
    return (
        <div>
        <div className="center">    
        <div className="container"> 
            <div className="text">Thêm Đề Tài</div>
            <form onSubmit={this.onSubmit}>
                <div className="data">
                    <label>Tên đề tài</label>
                    <input type="text" placeholder="Nhập tên đề tài" name="tenDoAn" value={this.state.tenDoAn}  required onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Nền tảng</label>
                    <input type="text" placeholder="Nhập nền tảng" name="nenTang" value={this.state.nenTang} required onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Loại đồ án</label>
                    <select className="form-control" name="loai" onChange={this.onChange} value={this.state.loai}>
                        <option value="Đồ án cơ sở">Đồ án cơ sở</option>
                        <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                        <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                        <option value="Khóa luận">Khóa luận</option>
                    </select>
                </div>
                <div className="data">
                    <label>Mô tả</label>
                    <textarea type="text" placeholder="Mô tả" name="moTa" value={this.state.moTa} onChange={this.onChange}/>
                </div>
                <div className="data">
                    <label>Số lượng</label>
                    <input type="number" min='1' max='3' className="form-control" name="ngDK" value={this.state.ngDK} onChange={this.onChange}/>
                </div>
                <div className="btn">
                    <div className="inner" />
                    <button className="submit-button" type="submit" >Thêm</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    );
  }
  
}

export default ThemDoAn;