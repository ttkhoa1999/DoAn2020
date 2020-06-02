import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';


class DanhSachDoAn_Admin extends Component{
  constructor(props){
    super(props);
    const cookie = new Cookies();
    this.id = cookie.get('id') !== 'undefined' ? true : false;
    this.state = {
      s : false,
      n : false,
      ngayNop : '',
      phong : '',
    }
  }

  onDelete = (id) => {
    if(confirm('Bạn có chắc chắn muốn xóa đề tài không ?')){ //eslint-disable-line
      this.props.onDelete(id);
    }
  }

  onChange = ({target}) => {
    this.setState({
      [target.name] : target.value
  })
  }

  onClickP = (id) => {
    this.setState({
      n : !this.state.n
    })
    this.props.onClickP(id, this.state.phong);
  }

  onClickS = (id) => {
    this.setState({
      s : !this.state.s
    })
    this.props.onClickS(id, this.state.ngayNop);
  }

  onClick = () => {
    this.setState({
      s : !this.state.s,
    })
  }

  onClick1 = () => {
    this.setState({
      n : !this.state.n,
    })
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
    console.log(this.state.ngayNop);
    var {ds, index} = this.props;
    return (
      <tr>
            <td>{index + 1}</td>
            <td>{ds.tenDoAn}</td>
            <td>{ds.nenTang}</td>
            <td>{ds.moTa}</td>
            <td>{ds.ngDK}</td>
            {
              this.id ? '' :
              <td >
                {ds.ngayNop}
                <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClick}>CN</button>
                {this.state.s ? 
                  <div>
                    <input type="date" name="ngayNop" id="input" className="form-control" onChange={this.onChange} value={this.state.ngayNop} required="required" title="" />
                    <button type="button" className="btn btn-danger" onClick={() => this.onClickS(ds.id)}>save</button>
                  </div>
                  :
                  ''
                }
              </td>
            }
            {
              this.id ? '' :
              <td >
                {ds.phong}
                <button type="button" className="btn btn-warning ml-10 f" onClick={this.onClick1}>CN</button>
                {this.state.n ? 
                  <div>
                    <input type="text" name="phong" id="input" className="form-control" onChange={this.onChange} value={this.state.phong} required="required" title="" />
                    <button type="button" className="btn btn-danger" onClick={() => this.onClickP(ds.id)}>save</button>
                  </div>
                  :
                  ''
                }
              </td>
            }
            <td>{ds.user.map((item, index) => {
                    if(item.isGV === true){
                    return  <p className="ml-10 mt-5" key={item.id}>{item.ten}, Email: {item.mssv}@dlu.edu.vn
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
