import React, { Component } from 'react';
import axios from 'axios';
//import moment from 'moment';



class SuaDoAn extends Component{
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

    componentDidMount(){
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'GET',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : null,
        }).then(res => {
            this.setState({
                tenDoAn : res.data.tenDoAn,
                nenTang : res.data.nenTang,
                moTa : res.data.moTa,
                //ngayNop : moment(res.data.ngayNop, "DD-MM-YYYY").format("YYYY-MM-DD"),
                ngDK : res.data.ngDK,
            })
        })
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
        console.log(this.state.ngayNop);
        e.preventDefault();
        let {history} = this.props;
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'PUT',
            url : `http://localhost:4000/topics/${id}/edit`,
            data : {
                tenDoAn : this.state.tenDoAn,
                nenTang : this.state.nenTang,
                moTa : this.state.moTa,
                ngDK : this.state.ngDK,
            }
        }).then(res => {
            if(res.data === 's'){
                alert('Sửa đồ án thàng công');
                history.goBack();
            }
            else alert('Có lỗi xảy ra, xin thử lại');
        })
    }
  render() {
    return (
        <div>
            <div className="center">    
            <div className="container"> 
                <div className="text">Sửa Đề Tài</div>
                <form onSubmit={this.onSubmit}>
                    <div className="data">
                        <label>Tên đề tài</label>
                        <input type="text" placeholder="Nhập tên đề tài" name="tenDoAn" value={this.state.tenDoAn} required onChange={this.onChange}/>
                    </div>
                    <div className="data">
                        <label>Nền tảng</label>
                        <input type="text" placeholder="Nhập nền tảng" name="nenTang" value={this.state.nenTang} required onChange={this.onChange}/>
                    </div>
                    <div className="data">
                        <label>Mô tả</label>
                        <textarea type="text" placeholder="Mô tả" name="moTa" value={this.state.moTa} onChange={this.onChange} />
                    </div>
                    <div className="data">
                        <label>Số lượng</label>
                        <input type="number" min='1' max='3' className="form-control" value={this.state.ngDK} name="ngDK" onChange={this.onChange}/>
                    </div>
                    <div className="btn">
                        <div className="inner" />
                        <button className="submit-button" type="submit" >Sửa</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
  }
  
}

export default SuaDoAn;