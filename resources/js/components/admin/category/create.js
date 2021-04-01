import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            display: false,
            loading:false
        };
    }

    category(event) {
        this.setState({
            name: event.target.value
        })
    }

    createcategory(event) {
        
        event.preventDefault();
        let senderData = {
            name: this.state.name,
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        this.setState({
            loading: true
        })
        Axios.post('/api/category', senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-category');
                Swal.fire({
                    icon: 'success',
                    title: 'Category Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    render() {
        return (

            <div id="page-content">
            <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                    <div className="panel-heading">
                    <h3 className="panel-title">Service Pricing</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Name:</label>
                                        <input onChange={this.category.bind(this)} type="text" className="form-control" id="price" placeholder="Enter Price" name="price"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createcategory.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Create;