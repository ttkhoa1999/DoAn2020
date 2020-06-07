import React, { Component } from 'react';
import axios from 'axios';



class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            dso : [],
        }
    }

    componentDidMount(){
        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/orders',
            data : null,
            withCredentials: true,
          }).then(res => {
            console.log(res.data);
            if(res.data !== null){
              this.setState({
                dso : res.data,
              })
            }
        })
    }

    onClick = (idT, id) => {
        axios({
            method : 'POST',
            url : `http://localhost:4000/topics/${idT}/ThemGV`,
            data : null,
            withCredentials: true,
        }).then(res => {
            if(res.data.length !== 0){
                let index = this.findId(this.state.dso, id);
                if(index !== -1){
                this.state.dso.splice(index, 1);
                this.setState({
                    dso : this.state.dso,
                })
                }

                axios({
                    method : 'DELETE',
                    url : `http://localhost:4000/orders/${id}`,
                    data : null
                  }).then(res => {
                    
                  })
            }
            window.location.reload(false);
        })
    }

    onClickD = (id) => {
        axios({
            method : 'DELETE',
            url : `http://localhost:4000/orders/${id}`,
            data : null
          }).then(res => {
            let index = this.findId(this.state.dso, id);
            if(index !== -1){
            this.state.dso.splice(index, 1);
            this.setState({
                dso : this.state.dso,
                })
            }
            window.location.reload(false);
          })
    }

    findId = (dso, id) => {
        let resuft = -1;
        dso.forEach((ds, index) => {
          if(ds.id === id){
            resuft = index;
          }
        });
        return resuft;
      }
  render() {
    return (
        <div className="row">
              <div className="col-xs- col-sm- col-md-6 col-lg- ml"> 
                <div className="panel panel-danger ml mt">
                    <div className="panel-heading">
                            <h3 className="panel-title mc">Lời mời tham gia hướng dẫn đồ án</h3>
                    </div>
                    <div className="panel-body">
                        
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Tên đề tài hướng dẫn</th>
                                    <th>Người mời</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dso.map((item, index) => {
                                    return <tr  key={index}>
                                                <td>{item.Topic.tenDoAn}</td>
                                                <td>{item.User === null ? 'admin' : item.User.ten}</td>
                                                <td className="ml-10">
                                                    <button type="button" className="btn btn-warning" onClick={() => this.onClick(item.Topic.id, item.id)}>Đồng ý</button>
                                                    <button type="button" className="btn btn-danger ml-10" onClick={() => this.onClickD(item.id)}>Từ chối</button>
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

export default Order;