import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
class AddFaqs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question:'',
            answer:'',
            error_string:''
        };
    }
    question(e){
        this.setState({
            question:e.target.value
        })
    }
    answer(e){
        this.setState({
            answer:e.target.value
        })
    }
    save(e){
        e.preventDefault();
        Axios.post('/api/add_faq',this.state).then(res=>{
            
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Faq Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }) 
            }else{
                this.setState({
                    error_string:res.data.msg
                })
            }
        })
    }
    render() {
        return (
            <div id="page-content">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">General Settings</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Faq Question</label>
                                    <input onChange={this.question.bind(this)} type="text" className="form-control" id="price"/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Faq Answer</label>
                                    <textarea onChange={this.answer.bind(this)} type="text" className="form-control" id="price"/>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.error_string != ''?
                            <p className="text-danger text-center">{this.state.error_string}</p>
                            :null
                        }
                        <div className="panel-footer text-right">
                            <button

                                onClick={this.save.bind(this)} type="submit" className="btn btn-primary">
                                Save
                                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFaqs;