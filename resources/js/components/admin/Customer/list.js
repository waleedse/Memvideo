import React from 'react';
import Axios from 'axios';
import Link from 'react-router-dom';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        Axios.get('/api/customer-list', { headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res => {
            console.log(res);
            if(res.data.status == true) {
                this.setState({
                    customers: res.data.data
                })
            }
            // console.log(res);
        })
    }

    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Customer List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            {/* <th>Address</th>
                                            <th>Phone</th>
                                            <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.customers.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.fname}</td>
                                                        <td>{data.lname}</td>
                                                        <td>{data.email}</td>
                                                        {/* <td>{data.address}</td>
                                                        <td>{data.phone}</td> */}
                                                        {/* <td><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></td> */}
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.customers.length == 0 ? 
                                            <tr><td colSpan="7">No records founded</td></tr>:null
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

export default CustomerList;