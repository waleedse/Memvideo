import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            promos: [],
        }
    }
    componentDidMount(){
        Axios.get(`/api/promocode-list`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    promos: res.data.data
                })
            } 
        })
    }
    deletePromoCode(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-promocode',data).then(res=>{
            this.componentDidMount();
        })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Promocode Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.promos.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.price}</td>
                                                            <td>
                                                                <Link to={`/admin/promocode-detail/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link>
                                                                <button onClick={this.deletePromoCode.bind(this, data.id)} className="btn btn-outline-primary"> <i  className="fa fa-trash"> </i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.promos.length == 0 ? 
                                                        <tr><td colSpan="4">No records founded</td></tr>:null
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Index;