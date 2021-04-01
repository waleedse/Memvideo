import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            faqs: [],
        }
    }
    componentDidMount(){
        Axios.post('/api/get_all_faqs').then(res=>{
                this.setState({
                    faqs: res.data
                })
        })
    }
    deleteFaq(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-faq',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }
    add_faq(){
        this.props.history.push('/admin/add-faq');
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Faqs Lists</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel-footer ">
                            <button

                                onClick={this.add_faq.bind(this)} type="submit" className="btn btn-success">
                                Add Faqs
                                            </button>
                        </div>
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.faqs.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.question}</td>
                                                            <td>{data.answer}</td>
                                                            <td>
                                                                <Link to={`/admin/faq-detail/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link>
                                                                <button onClick={this.deleteFaq.bind(this, data.id)} className="btn btn-outline-primary"> <i  className="fa fa-trash"> </i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.faqs.length == 0 ? 
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