import Axios from 'axios';
import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { connect } from 'react-redux';
import { m_video, thumb_image, t_video } from '../../../configs/baseapi';
import Swal from 'sweetalert2'
import PaymentModal from './Components/PaymentModal';
class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video:{},
            loading:true,
            play_watch_video:false,
            display_section:'purchase',
            purchase_type:'',
            wrong_slug:false,
            modal_title:''
        };
    }
    componentDidMount(){
        let payload = {
            slug:this.props.match.params.slug,
            customer_id:this.props.user.data.id
        }
        Axios.post('/api/get_video_by_slug',payload).then(res=>{
            console.log(res);
            if(res.data.status == 200){
                this.setState({
                    video:res.data.video,
                    loading:false,
                    display_section:'video'
                })
            }else if(res.data.status == 202){
                this.setState({
                    display_section:'purchase',
                    loading:false,
                    video:res.data.video
                })
            }else{
                this.setState({
                    wrong_slug:true,
                    loading:false
                })
            }
        })
    }
    show_trailer(){
        this.setState({
            display_section:'trailer'
        })
    }
    show_payment_modal(type_){
        if(this.props.user.is_login){
            this.setState({
                purchase_type:type_,
                modal_title:type_ == 'rent' ? 'Rent Video':'Buy Video'
            })
            this.props.change_payment_modal(true);
        }else{
            this.props.changeAuthmodal('login');
        }
    }
    render() {
        if(this.state.loading){
            return (
                <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%' , marginBottom:'20%'}}>
                    <div className="spinner-border  ml-2 text-light "  role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        if(this.state.wrong_slug){
            return(
                <div style={{marginTop: '20%' , marginBottom:'20%' }} className="text-center mt-5">
                    <div className="text-light mt-5">
                        <h1>Sorry, No Video Found.</h1>
                    </div>
                </div>
            )
        }
        return (
            <div  className="watch"  style={{paddingBottom:'300px'}}>
                {
                    this.state.display_section == 'video'?
                    <div id="watch">
                    <Video  autoPlay loop 
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster={thumb_image+this.state.video.thumb_image}
                    onCanPlayThrough={() => {
                            // Do stuff
                    }}>
                    <source src={m_video+this.state.video.m_video}/>
                    <track label="English" kind="subtitles" srcLang="en" src="#" default />
                </Video>
                <div className="watchPage">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8">
                                <h1 className="h1 h1color">{this.state.video.title}</h1>
                            </div>
                            {/* <div className="col-xs-12 col-sm-4 col-md-4">
                               <button className="btn rent_btn btn-outline-light mt-3"> 
                                    Buy ${this.state.video.buy_video}
                               </button>
                               <button className="btn rent_btn btn-outline-success mt-3"> 
                                    Rent ${this.state.video.rent_a_video}
                               </button>
                            </div> */}
                        </div>
                        <div >
                            <p className="des_text">{this.state.video.description}</p>
                        </div>
                    </div>
                </div>
                </div>
                :
                null
                }
                {
                    this.state.display_section == 'purchase' ?
                    <div className="purchase_div container">
                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <img className="purchase_thumb_image" src={thumb_image+this.state.video.thumb_image}></img>
                        </div>
                        <div className="col-md-6  mt-2">
                            <div className="card py-5 purchase_card card-dropdown animate_auth_modal">
                                <div className="title_div">
                                    <h2 className="modal_title text-light">{this.state.video.title}</h2>
                                </div>
                                <div className=" text-center ">
                               <button style={{background:this.props.settings.buy_btn_bg}} onClick={this.show_payment_modal.bind(this,'buy')} className="btn buy_btn mt-3"> 
                                    Buy ${this.state.video.buy_video}
                               </button><br></br>
                               <button style={{background:this.props.settings.rent_a_video}} onClick={this.show_payment_modal.bind(this,'rent')} className="btn rent_btn  mt-3"> 
                                    Rent ${this.state.video.rent_a_video}
                               </button><br></br>
                               <button style={{background:this.props.settings.watch_btn_bg}} onClick={this.show_trailer.bind(this)} className="btn text-dark watch_trailer_btn">Watch Trailer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                    
                    <div className=" row bnner_text_content">
                        <div className="col-sm-1"></div>
                            <div className="col-md-8 col-lg-8 text-left">
                               
                                    <h1 className="video_title">{this.props.banner_video.title}</h1>
                               
                                
                                   <p className="video_des"> {this.props.banner_video.description}</p>
                                
                            </div>
                        </div>
                        </div>
                </div>:null
                }
                {
                    this.state.display_section == 'trailer' ?
                    <>
                    <Video  autoPlay loop 
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster={thumb_image+this.state.video.thumb_image}
                    onCanPlayThrough={() => {
                            // Do stuff
                    }}>
                    <source src={t_video+this.state.video.t_video}/>
                    <track label="English" kind="subtitles" srcLang="en" src="#" default />
                    </Video>
                <div className="watchPage">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-8">
                                <h1 className="h1 h1color">{this.state.video.title}</h1>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                               <button style={{background:this.props.settings.buy_btn_bg}}  onClick={this.show_payment_modal.bind(this,'buy')} className="btn rent_btn btn-outline-light mt-3"> 
                                    Buy ${this.state.video.buy_video}
                               </button>
                               <button  style={{background:this.props.settings.rent_btn_bg}}  onClick={this.show_payment_modal.bind(this,'rent')} className="btn rent_btn btn-outline-success mt-3"> 
                                    Rent ${this.state.video.rent_a_video}
                               </button>
                            </div>
                        </div>
                        <div >
                            <p className="des_text">{this.state.video.description}</p>
                        </div>
                    </div>
                </div>
                </>:null
                }
               {
                   this.props.payment_modal ?
                   
                        <PaymentModal {...this.props} purchase_type={this.state.purchase_type}
                        video={this.state.video}
                        title={this.state.modal_title}/>
                    
                    :null
               }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        payment_modal:state.payment_modal,
        user:state.user,
        banner_video:state.banner_video,
        settings:state.settings
    }
}
const mapDistapatchToProps = (dispatch)=>{
    return{
        change_payment_modal:(modal)=>{dispatch({type:'CHANGE_PAYMENT_MODAL',payload:modal})},
        changeAuthmodal:(modal=>{dispatch({type:'CHANGE_AUTH_MODAL',payload:modal})})
    }
} 
export default connect(mapStateToProps,mapDistapatchToProps)(Watch);