import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showmodalLogin: false,
            loading:false,
            error_string:''
        };
    }


    show_modal_login() {
        this.setState({
            showmodalLogin: true
        })
    }

    getEmail(event) {
        this.setState({
            email: event.target.value,
        })
    }

    getPassword(event) {
        this.setState({
            password: event.target.value,
        })
    }

    hide_modal_login() {
        this.props.chanageAuthModal('');
    }

    loginCustomer(event) {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({loading:true})
        Axios.post('/api/customer-login', data).then(res=>{
            console.log(res);
            this.setState({loading:false})
            if(res.data.status == 200) {
               let user = {data:res.data.data,is_login:true}
               this.props.changeUser(user);
               window.localStorage.setItem('token',res.data.data.token);
               window.location.reload();
               this.props.chanageAuthModal('');
            }else{
                this.setState({
                    error_string:res.data.msg
                })
            }
        })
    }

    render() {
        return (
            <div>
                
                        <div className="joinmodal">
                            <div className="col-md-4"></div>
                            <div className="joinmodal_card col-md-4 col-sm-12">
                                <div className="cross_div modal_title_color">
                                    <div className=" text">
                                    <img className="cross_icon p-3" onClick={this.hide_modal_login.bind(this)} src="https://img.icons8.com/ios/35/000000/multiply.png"/>
                                        <h3 className="modal_title_login">Login</h3>
                                    </div> 
                                    <hr className="hrmargin"/> 
                                </div>
                                <form className="form-style">
                                   <div className="form-group">
                                        <input type="text" className="form-control search-input" onChange={this.getEmail.bind(this)} placeholder="Email address"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control search-input" onChange={this.getPassword.bind(this)} placeholder="Password"/>
                                    </div>
                                    <a href="">Forgot your password?</a>
                                    <br></br>
                                    <br></br>
                                    {
                                        this.state.error_string != ''?
                                        <p className="text-center text-danger error_text">{this.state.error_string}</p>
                                        :null
                                    }
                                    <button type="submit" onClick={this.loginCustomer.bind(this)} className="btn btn-success">
                                           {
                                               this.state.loading ?
                                               <div id="displayspinner" style={{ display: 'block' }}>
                                               <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                   <span className="sr-only">Loading...</span>
                                                </div>
                                                </div>
                                                : <>Submit</>
                                           }
                                        </button>
                                </form>
                            </div>
                        </div>
                   
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
       chanageAuthModal:(modal)=>{dispatch({type:'CHANGE_AUTH_MODAL',payload:modal})},
       changeUser:(user)=>{dispatch({type:'CHANGE_USER',payload:user})}
    }
}
export default connect(null,mapDispatchToProps) (Login);