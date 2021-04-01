import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';
import Swal from 'sweetalert2';
import './contact.css';
import { withRouter } from "react-router";
export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      phone:'',
      message:'',
      error_string:''
    };
  }
  name(e){
    this.setState({
      name:e.target.value
    })
  }
  email(e){
    this.setState({
      email:e.target.value
    })
  }
  phone(e){
    this.setState({
      phone:e.target.value
    })
  }
  message(e){
    this.setState({
      message:e.target.value
    })
  }
  submit(){
    Axios.post('/api/contact-us-mail',this.state).then(res=>{
      if(res.data.status == 200){
        Swal.fire({
          icon: 'success',
          title: res.data.msg,
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
      <div className="contact-section">
          <div className="container">
        <div className="row" style={{marginTop: "40px"}}>
          <div className="col-12">
            <h3 className="pageTitle">
              <span className="textDivider">CON</span>TACT US
            </h3>
          </div>
        </div>
        <div className="row contactUsRow">
          <div className="col-md-4">
            {/* <p className="contactText">Email or contact us</p> */}
            <p className="contactText">
              <FontAwesomeIcon
                className="mr-2"
                icon={faMapMarkerAlt}
                color="#7D7D7D"
                size="lg"
              ></FontAwesomeIcon>
              memvod
            </p>
            <a href="mailto:orders@aldyarmeat.com"><p className="contactText">
              <FontAwesomeIcon
                className="mr-2"
                icon={faEnvelope}
                color="#7D7D7D"
                size="lg"
              ></FontAwesomeIcon>
              Email: memvod@memvod.com
            </p></a>
            <a href="tel:+44 752 351 1011"><p className="contactText">
              <FontAwesomeIcon
                className="mr-2"
                icon={faPhoneAlt}
                color="#7D7D7D"
                size="lg"
              ></FontAwesomeIcon>
              Hotline: +000 0000 000
            </p></a>
          </div>
          <div className="col-md-8">
            <h2 className="contactTitle">SEND YOUR COMMENTS</h2>
            <div className="leftInput">
              <div className="mt-3">
                <input
                onChange={this.name.bind(this)}
                  className="form-control"
                  type="text"
                  placeholder="Your Name*"
                ></input>
              </div>
              <div className="mt-3">
                <input
                  onChange={this.email.bind(this)}
                  className="form-control"
                  type="text"
                  placeholder="Your Email*"
                  name="email"
                ></input>
              </div>
              <div className="mt-3">
                <input
                  onChange={this.phone.bind(this)}
                  className="form-control"
                  type="text"
                  placeholder="Your Phone"
                  name="phone"
                ></input>
              </div>
            </div>
            <div className="mt-5">
              <textarea
                onChange={this.message.bind(this)}
                rows="4"
                cols="3"
                className="form-control mt-5"
                placeholder="Your Message"
              ></textarea>
            </div>
            {
              this.state.error_string != '' ?
              <p className="text-left text-danger">{this.state.error_string}</p>
              :null
            }
            <div className="my-3">
              <button onClick={this.submit.bind(this)} className="btn-submit">SEND MESSAGE</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}