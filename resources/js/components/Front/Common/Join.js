import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2';
class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showmodalJoin:false,
            loading:false,
            error_string:''
        };
    }

    getFirstName(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    getLastName(event) {
        this.setState({
            lastName: event.target.value
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

    show_modal_join(){
        this.setState({
            showmodalJoin: true
        })
    }
    hide_modal_join() {
        this.props.chanageAuthModal('');
    }

    joinCustomer(event) {
        event.preventDefault();
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({loading:true})
        Axios.post('/api/create-customer', data).then(res=>{
            this.setState({loading:false})
            if(res.data.status == 200) {
                let user = {data:res.data.data,is_login:true}
               this.props.changeUser(user);
               window.localStorage.setItem('token',res.data.data.token);
               window.location.reload();
               this.props.chanageAuthModal('');
            }else{
                this.setState({error_string:res.data.msg})
            }
        })
    }
    render() {
        return (
            <div  className= "auth_modal">
                        <div className="joinmodal">
                        <div className="col-md-4"></div>
                            <div className="joinmodal_card col-md-4 col-sm-12">
                                <div className="cross_div">
                                <img className="cross_icon p-3" onClick={this.hide_modal_join.bind(this)} src="https://img.icons8.com/ios/35/000000/multiply.png"/>
                                    <h1 className="modal_title">Join</h1>
                                    <hr className="hrmargin"/> 
                                </div>

                                <form className="form-style">
                                    <div className="form-group">
                                        <input type="text" className="form-control search-input" onChange={this.getFirstName.bind(this)} placeholder="First Name"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control search-input" onChange={this.getLastName.bind(this)} placeholder="Last Name"/>
                                    </div>
                                   <div className="form-group">
                                        <input type="text" className="form-control search-input" onChange={this.getEmail.bind(this)} placeholder="Email address"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control search-input" onChange={this.getPassword.bind(this)} placeholder="Password"/>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    {
                                        this.state.error_string != ''?
                                        <p className="text-center text-danger error_text">{this.state.error_string}</p>
                                        :null
                                    }
                                    <button type="submit" onClick={this.joinCustomer.bind(this)} className="btn btn-success">
                                    {
                                               this.state.loading ?
                                               <div id="displayspinner" style={{ display: 'block'}}>
                                               <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                   <span className="sr-only">Loading...</span>
                                                </div>
                                                </div>
                                                : <>Submit</>
                                           }</button>
                                </form>
                            </div>
                        </div>
                  
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
       chanageAuthModal:(modal)=>{dispatch({type:'CHANGE_AUTH_MODAL',payload:modal})},
       changeUser:(user)=>{dispatch({type:'CHANGE_USER',payload:user})}
    }
}
export default connect(null,mapDispatchToProps)(Join);