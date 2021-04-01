import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            display: false,
            loading:false
        };
    }

    componentDidMount() {
        Axios.get(`/api/category/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    name: res.data.category.name
                })
            }
        })
    }

    category(event) {
        this.setState({
            name: event.target.value
        })
    }

    updatecategory(event) {
        
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            id: this.props.match.params.id
        }
        this.setState({
            loading: true
        })
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/category/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-category');
                swal.fire({
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
                            <h3 className="panel-title">Edit Category</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="price">Name:</label>
                                                <input onChange={this.category.bind(this)} type="text" className="form-control" id="price" value={this.state.name || ""} placeholder="Enter Price" name="price"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updatecategory.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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

export default Edit;