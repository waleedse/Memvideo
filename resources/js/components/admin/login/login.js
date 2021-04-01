import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            loading:false
        };
    }

    componentDidMount() {
        let senderData = {
            token:window.localStorage.getItem('testapistring'),
        }
        Axios.post('/api/check-auth-admin', senderData).then(res=>{
            if(res.data.status == 200) {
                this.props.history.push('/admin');
                Swal.fire({
                    icon: 'success',
                    title: 'You Are Successfully Logedin',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    adminemail(event) {
        this.setState({
            email: event.target.value
        })
    }
    password(event) {
        this.setState({
            password: event.target.value
        })
    }

    login(event) {
        
        event.preventDefault();
        let senderData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({
            loading: true
        })
        Axios.post('/api/login-admin', senderData).then( res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                window.localStorage.setItem('testapistring', res.data.admin.token)
                
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.open('/admin','_self');
                
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
            <div id="container" className="cls-container">
                <div id="bg-overlay"></div>
                <div className="cls-content">
                    <div className="cls-content-sm panel">
                        <div className="panel-body">
                            <div className="mar-ver pad-btm">
                                <h1 className="h3">Account Login</h1>
                                <p>Sign In to your account</p>
                            </div>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" onChange={this.adminemail.bind(this)} placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" onChange={this.password.bind(this)} className="form-control" placeholder="Password" />
                                    </div>
                                    <button onClick={this.login.bind(this)} className="btn btn-primary btn-lg btn-block" type="submit">Sign In</button>
                                </form>
                        </div>
                    </div>
                </div>	
            </div>
        );
    }
}

export default Login;