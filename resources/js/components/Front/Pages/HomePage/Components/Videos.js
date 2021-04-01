import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { common_imges, image_base, thumb_image, t_video } from '../../../../configs/baseapi';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { connect } from 'react-redux';

class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            showmodal: false,
            modalData: [],
            loading: false,
            wrong_slug: false,
        };

    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.query) {
            let payload = {
                query_string: this.props.match.params.query
            }
            this.setState({
                loading: true
            })
            Axios.post('/api/search', payload).then(res => {
                this.setState({
                    loading: false
                })
                console.log(res);
                this.setState({
                    videos: res.data.videos
                })
                if (res.data.videos.length == 0) {
                    this.setState({
                        wrong_slug: true
                    })
                }
            })
        }
        this.setState({
            videos: this.props.videos
        })

    }
    show_modal(data) {

        this.setState({
            modalData: data,
            showmodal: true
        })
    }

    hide_modal() {
        this.setState({
            showmodal: false
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%', marginBottom: '20%' }}>
                    <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        if (this.state.wrong_slug) {
            return (
                <div style={{ marginTop: '20%', marginBottom: '20%' }} className="text-center mt-5">
                    <div className="text-light mt-5">
                        <h1>Sorry, No Video Found.</h1>
                    </div>
                </div>
            )
        }
        return (
            <div >
                <div className="bannerimg banner_bg" style={{ backgroundImage: `url(${common_imges + this.props.settings.site_banner})` }}>
                    <div className="container">
                      
                        <div className=" row bnner_text_content">
                             <div className="col-md-6 col-lg-6">

                            </div>
                            <div className="col-md-6 col-lg-6 text-left">
                               
                                    <h1 className="video_title">{this.props.banner_video.title}</h1>
                               
                                
                                   <p className="video_des"> {this.props.banner_video.description}</p>
                                
                            </div>
                        </div>
                        <div  className="row ">
                            <div className="col-md-6 col-sm-6 col-lg-6">

                            </div>
                            <div className="col-md-6 col-sm-6 col-lg-3 mt-2 buy_video_btn  ">
                                <a  href={`/watch/${this.props.banner_video ? this.props.banner_video.slug:'null'}`}><button style={{background:this.props.settings.buy_btn_bg}} className="btn banner_buy_btn mt-2 col-sm-12">Rent/Buy</button></a>
                                {/* <a  href={`/watch/${this.props.banner_video ? this.props.banner_video.slug:'null'}`}><button style={{background:this.props.settings.rent_btn_bg}} className="btn banner_buy_btn mt-2 col-sm-12" >Buy ${this.props.banner_video.buy_video}</button></a> */}
                                <button onClick={this.show_modal.bind(this,this.props.banner_video)} style={{background:this.props.settings.watch_btn_bg}} className="btn text-dark banner_watch_btn mt-2 col-sm-12">Watch Trailer</button>
                            </div> 
                           
                            <div className="col-md-3">

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="videos row " style={{paddingBottom:'300px'}}>
                        {
                            this.state.videos.map((data, index) => {
                                return (
                                    <div className="col-md-12 col-sm-12 col-lg-6  video_card_div">
                                        <a href={`/watch/${data.slug}`}><div style={{ backgroundImage: `url(${thumb_image + data.thumb_image})` }} className="card video_card">
                                        </div></a>
                                        <div className="card_content">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="video_card_img_section">
                                                        <a href={`/watch/${data.slug}`}><img className="video_card_img" src={thumb_image + data.thumb_image}></img></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <div className="video_card_sections">
                                                        <a href={`/watch/${data.slug}`}><h2 className="video_card_title">{data.title}</h2></a>
                                                        <div className="mt-3">
                                                            {/* <h5 className="des_text hide_on_mob">From bawa g bagadiyan</h5> */}
                                                            <a href={`/watch/${data.slug}`}><h5 className="des_text  hide_on_mob mt-5">{data.description}</h5></a>
                                                            {/* <h5 className="des_text">Film Threat</h5> */}
                                                            <button onClick={this.show_modal.bind(this, data)} className="btn watch_trailer_btn">Watch Trailer</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {
                        this.state.showmodal ?
                            <div className="homemodal">
                                <div className="homemodal_card card-dropdown animate_auth_modal">
                                    <div className="cross_div">
                                        <img className="cross_icon p-3" onClick={this.hide_modal.bind(this)} src="https://img.icons8.com/ios/35/000000/multiply.png" />
                                        <h1 className="modal_title">{this.state.modalData.title}</h1>
                                        <hr className="hrmargin" />
                                        <Video autoPlay fullScreen
                                            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                            poster=""
                                            width="220"
                                            onCanPlayThrough={() => {
                                                // Do stuff
                                            }}>
                                            <source src={t_video + this.state.modalData.t_video} type="video/mp4" />
                                            {/* <track label="English" kind="subtitles" srcLang="en" src="" default /> */}
                                        </Video>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        videos: state.videos,
        settings: state.settings,
        banner_video: state.banner_video
    }
}
export default connect(mapStateToProps)(Videos);