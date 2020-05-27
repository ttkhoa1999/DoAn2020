import React, { Component } from 'react';
import axios from 'axios';



class DanhSachGiaoVien extends Component{
    constructor(props){
        super(props);
        this.state = {
            isGV : [],
        }
    }

    componentDidMount(){
        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/isGV',
            data : null,
        }).then(res => {
            console.log(res);
            this.setState({
                isGV : res.data,
            })
        })
    }

    onClick = (idu) => {
        const {history} = this.props;
        let {match} = this.props;
        let {id} = match.params;
        axios({
            method : 'POST',
            url : `http://localhost:4000/topics/${id}/ThemGV`,
            data : {idUser : idu}
        }).then(res => {
            console.log(res.data);
            history.push('/QuanLyDoAn');
        })
    }
  render() {
    return (
        <div className="row">
            <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Danh sách giáo viên</h3>
                    </div>
                    <div className="panel-body">
                        
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Tên giáo viên</th>
                                    <th>Tên đề tài hướng dẫn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.isGV.map((item, index) => {
                                    return <tr  key={index}>
                                                <td>{item.ten}</td>
                                                <td>
                                                    {this.state.isGV[index].topic.map((item, index) => {
                                                        return <p key={index}>{item.tenDoAn}</p>
                                                    })}
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-warning" onClick={() => this.onClick(this.state.isGV[index].id)}>Chọn</button>
                                                </td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  
}

export default DanhSachGiaoVien;