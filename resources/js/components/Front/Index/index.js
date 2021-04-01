import React, { Component } from 'react';
import NavBar from '../Common/Navbar';
import Footer from '../Common/Footer'; 

import {Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage/Index';
import Watch from '../Pages/Watch/watch';
import Profile from '../Pages/Profile/Profile';
import MyVideos from '../Pages/Profile/MyVideos';
import Contactus from '../Pages/contactUs/contact';
import PrivacyPolicy from '../Pages/StaticPages/PrivacyPolicy';
import TermsAndConditions from '../Pages/StaticPages/TermsAndConditions';
import Faqs from '../Pages/StaticPages/Faqs';
import {connect} from 'react-redux';
import Axios from 'axios';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload_loading:true
        };
    }
    componentDidMount(){
        let payload = {
            token:window.localStorage.getItem('token')
        }
        Axios.post('/api/get_app_index',payload).then(res=>{
            console.log(res);
            if(res.data.status == 200){
               this.props.changeSettings(res.data.settings);
               this.props.changeVideos(res.data.videos);
               if(res.data.auth_status){
                   let user = {data:res.data.customer,is_login:true}
                   this.props.changeUser(user);
               }
               this.props.changeBannerVideo(res.data.banner_video);
            }
            this.setState({
                payload_loading:false
            })
            
        })
    }
    render() {
        return (
            <div>
                
                    {
                        this.state.payload_loading ?
                        <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%' }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format"  role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                      </div>:
                        <div id="frontend">
                        <NavBar {...this.props}></NavBar>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route exact path="/search/:query" component={HomePage}></Route>
                        <Route exact path="/login" component={HomePage}></Route>
                        <Route exact path="/join" component={HomePage}></Route>
                        <Route exact path="/my-videos" component={MyVideos}></Route>
                        <Route path="/watch/:slug" component={Watch}></Route>
                        <Route exact path="/profile" component={Profile}></Route>
                        <Route exact path="/contact-us" component={Contactus}></Route>
                        <Route exact path="/privacy-policy" component={PrivacyPolicy}></Route>
                        <Route exact path="/terms-and-conditions" component={TermsAndConditions}></Route>
                        <Route exact path="/faqs" component={Faqs}></Route>
                        <Footer></Footer>
                        </div>
                    }
                   
                </div>
           
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        changeUser:(user)=>{dispatch({type:'CHANGE_USER',payload:user})},
        changeSettings:(settings)=>{dispatch({type:'CHANGE_SETTINGS',payload:settings})},
        changeVideos:(videos)=>{dispatch({type:'CHANGE_VIDEOS',payload:videos})},
        changeBannerVideo:(videos)=>{dispatch({type:'CHANGE_BANNER_VIDEO',payload:videos})}
    }
}

export default connect(null,mapDispatchToProps)(Index);