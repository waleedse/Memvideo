import React, { Component } from 'react';
import { connect } from 'react-redux';

class PrivacyPolicy extends Component {
   
    render() {
        return (
            <div className="contact-section p-5">
                <div className="px-5 container-sm">
                    <div className="card p-5 content_card">
                        <div  dangerouslySetInnerHTML={{ __html: this.props.settings.privacy_policy}}></div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        settings:state.settings
    }
}
export default connect(mapStateToProps)(PrivacyPolicy);