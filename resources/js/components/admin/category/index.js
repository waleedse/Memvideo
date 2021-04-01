import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category: [],
            search_string:''
        }
    }
    componentDidMount(){
        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    category: res.data.categories
                })
            } 
        })
    }
    search(e){
        this.setState({
            search_string:e.target.value
        })
    }
    search_records(){
        // let senderdata = {
        //     string:this.state.search_string
        // }
        // Axios.post('/api/search_orders',senderdata).then(res=>{
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Category Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.category.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.name}</td>
                                                            <td><Link to={`/admin/edit-category/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.category.length == 0 ? 
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