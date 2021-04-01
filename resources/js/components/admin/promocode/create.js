import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            price: '',
            display: false,
            loading:false
        };
    }

    getname(event) {
        this.setState({
            name: event.target.value
        })
    }

    getPrice(event) {
        this.setState({
            price: event.target.value
        })
    }

    createPromoCode(event) {
        
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            price: this.state.price
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        this.setState({
            loading: true
        })
        Axios.post('/api/promocode', senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-promos');
                Swal.fire({
                    icon: 'success',
                    title: 'Promocode Added Successfully',
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
                    <h3 className="panel-title">Promocode</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="price">Name:</label>
                                        <input onChange={this.getname.bind(this)} type="text" className="form-control" id="name" placeholder="Enter name" name="name"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="price">price:</label>
                                        <input onChange={this.getPrice.bind(this)} type="text" className="form-control" id="price" placeholder="Enter Price" name="price"/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createPromoCode.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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