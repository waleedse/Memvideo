import React, { Component } from 'react';
import {Navbar , Nav} from 'react-bootstrap';
import Axios from 'axios'
import { common_imges } from '../../configs/baseapi';
import {connect} from 'react-redux';
import Login from './Login';
import Join from './Join'; 
class IndexNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            site_logo:'',
            auth_modal:'',
            query:''
        };
        console.log(this.props);
    }
    componentDidMount(){
        if(window.location.pathname == '/login' || window.location.pathname == '/join'){
            if(this.props.user.is_login){
                this.props.history.push('/profile');
            }else{
                this.props.chanageAuthModal(window.location.pathname);
            }
        }
       
    }
    auth_modal(modal){
      this.props.chanageAuthModal(modal);
    }
    logout(){
        window.localStorage.setItem('token','');
        window.location.reload();
    }
    search(e){
        this.setState({
            query:e.target.value
        })
    }
    search_query(e){
        e.preventDefault();
        if(this.state.query != ''){
            window.open(`/search/${this.state.query}`,'_self');
        }
       
    }
    render() {
        return (
            <div>
                  <Navbar bg="dark" variant="dark">
                 
                    <Navbar.Brand href="/"><img src={common_imges+this.props.settings.site_logo}></img></Navbar.Brand>
                        <Nav className="mr-auto">
                            {
                                this.props.user.is_login ? 
                                <div>
                                    <ul class="nav">
                                        <li class="dropdown  my_account_dropdown">
                                            <a class="dropdown-toggle drop_a" data-toggle="dropdown" href="#">
                                            My Account
                                            </a>
                                            <ul style={{width:'140px'}} class=" card  card-dropdown display_none animate_auth_modal dropdown-menu" role="menu">
                                            <li><a href="#" style={{fontWeight:'700'}}>{this.props.user.data.fname}</a></li>
                                            <li class="divider"></li>
                                            <li><a href="/profile">Profile</a></li>
                                            <li class="divider"></li>
                                            <li><a href="/my-videos">My Videos</a></li>
                                            {/* <li class="divider"></li>
                                            <li><a href="#">My Payments</a></li> */}
                                            <li class="divider"></li>
                                            <li onClick={this.logout.bind(this)}><a href="#">Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <>
                                <Nav.Link className="ml-2" ><button onClick={this.auth_modal.bind(this,'join')} className="btn btn-success join_btn">Join</button></Nav.Link>
                                <Nav.Link className="mt-2" onClick={this.auth_modal.bind(this,'login')} >Login </Nav.Link>
                                </>
                            }
                          
                        </Nav>
                        <Nav>
                        <div className="search-web p-1  shadow-sm ml-auto" style={{backgroundColor:`${this.props.settings.watch_btn_bg}`,width:'300px',borderRadius:'4px'}}>
                        <form>
                            <div className="input-group">
                           
                                <input onChange={this.search.bind(this)} type="search" style={{backgroundColor:this.props.settings.watch_btn_bg}} placeholder="Search" aria-describedby="button-addon1" class="form-control search-input border-0 "/>
                                <div className="input-group-append">
                                    <button onClick={this.search_query.bind(this)} id="button-addon1" type="submit" className="btn btn-link text-primary"><i class="fas fa-search"></i></button>
                                </div>
                           
                            </div>
                            </form>
                        </div>
                        {/* <div className="search-mob">
                            <button id="button-addon1" type="submit" className="btn btn-link text-light"><i class="fas fa-search"></i></button>
                        </div> */}
                        </Nav>
                </Navbar>
                {
                    this.props.auth_modal == 'login' || this.props.auth_modal == '/login'?
                    <Login {...this.props}></Login>
                    :null
                }
                {
                    this.props.auth_modal == 'join' || this.props.auth_modal == '/join'?
                    <Join></Join>
                    :null
                }
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        settings:state.settings,
        auth_modal:state.auth_modal,
        user:state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
       chanageAuthModal:(modal)=>{dispatch({type:'CHANGE_AUTH_MODAL',payload:modal})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( IndexNav);