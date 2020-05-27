import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DanhSachDoAn_Admin extends Component{

  onDelete = (id) => {
    if(confirm('Bạn có chắc chắn muốn xóa đề tài không ?')){ //eslint-disable-line
      this.props.onDelete(id);
    }
  }

  onDeleteGV = (idGV, id) => {
    const {ds} = this.props;
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
    }
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
    var {ds, index} = this.props;
    return (
      <tr>
            <td>{index + 1}</td>
            <td>{ds.tenDoAn}</td>
            <td>{ds.nenTang}</td>
            <td>{ds.moTa}</td>
            <td>{ds.ngayNop}</td>
            <td>{ds.ngDK}</td>
            <td>{ds.user.map((item, index) => {
                    if(item.isGV === true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.email}
                              <button type="button" className="btn btn-warning ml-10 f" onClick={() => this.onDeleteGV(ds.user[index].id, ds.id)}>-</button>
                            </p>
                    }
                })}
              <Link to={`${ds.id}/tgv`}type="button" className="btn btn-primary f" >+</Link>
            </td>
            <td>
            <Link to={`${ds.id}/edit`}type="button" className="btn btn-success" >Sửa</Link>
            <button type="button" className="btn btn-danger ml-10" onClick={() => this.onDelete(ds.id)}>Xóa</button>
            </td>
      </tr>
    );
  }
  
}

export default DanhSachDoAn_Admin;
