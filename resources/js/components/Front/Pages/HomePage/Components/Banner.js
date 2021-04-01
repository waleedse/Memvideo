import React, { Component } from 'react';
import { common_imges } from '../../../../configs/baseapi';
import Axios from 'axios';
import {connect} from 'react-redux';
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Banner_logo:''
        };
    }
    // componentDidMount(){
    //     Axios.post('/api/get_general_settings').then(res=>{
    //         console.log(res);
    //         this.setState({
    //             Banner_logo:res.data.site_banner
    //         })
    //     })
    // }
    render() {
        return (
            <div >
                <div className="bannerimg">
                    <img className="banner_img" src={common_imges+this.props.settings.site_banner}></img>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        settings:state.settings
    }
}
export default connect(mapStateToProps)( Banner);