import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './profile.css';
import Swal from 'sweetalert2';
import { profile_img_base } from '../../../configs/baseapi';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname:'',
            lname:'',
            email:'',
            post_code:'',
            country:'',
            address:'',
            phone:'',
            city:'',
            error_string:'',
            user_name:'',
            loading:false,
            id:'',
            image:'',
            ptofile_image:''
        };
    }
    componentDidMount(){
        if(this.props.user.is_login){
            let user = this.props.user.data
            this.setState({
                fname:user.fname,
                lname:user.lname,
                email:user.email,
                post_code:user.postal_code,
                country:user.country,
                address:user.address,
                city:user.city,
                user_name:user.user_name,
                ptofile_image:user.image,
                id:user.id
            })
        }else{
            this.props.history.push('/login');
        }
    }
    fname(e){
        this.setState({
            fname:e.target.value
        })
    }
    lname(e){
        this.setState({
            lname:e.target.value
        })
    }
    address(e){
        this.setState({
            address:e.target.value
        })
    }
    phone(e){
        this.setState({
            phone:e.target.value
        })
    }
    city(e){
        this.setState({
            city:e.target.value
        })
    }
    post_code(e){
        this.setState({
            post_code:e.target.value
        })
    }
    country(e){
        this.setState({
            country:e.target.value
        })
    }
    update_profile(e){
        e.preventDefault();
        this.setState({
            loading:true
        })
        console.log(this.state);
        Axios.post('/api/update-customer',this.state).then(res=>{
            this.setState({
                loading:false
            })
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated SuccessFully',
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
    profile_image(event) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    image: images[0]
                })
            }, error => { console.error(error); });
        }
    }
    render() {
        return (
            <div className="main-content profile_page">
            
                {/* Page content */}
                <div className="container-fluid mt-5 mb-5">
                    <div className="row mt-5">
                        <div className="col-xl-4  mb-5 mb-xl-0">
                            <div className="card card-profile shadow">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">
                                        <div className="card-profile-image">
                                            <a href="#">
                                                <img src={profile_img_base+this.state.ptofile_image} className="rounded-circle" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="card-body pt-0 pt-md-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-8">
                                                <div>
                                                    <span className="heading">22</span>
                                                    <span className="description">Videos</span>
                                                </div>
                                                <div>
                                                    <span className="heading">10</span>
                                                    <span className="description">Rented</span>
                                                </div>
                                                <div>
                                                    <span className="heading">89</span>
                                                    <span className="description">Brought</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3>
                                            {this.props.user.data.fname} {this.props.user.data.lname}<span className="font-weight-light"></span>
                                        </h3>
                                        <i className="ni education_hat mr-2" />@{this.props.user.data.user_name}
                                        <div className="h5 font-weight-300">
                                        
                                            <i className="ni location_pin mr-2" />{this.props.user.data.city} , {this.props.user.data.country}
              </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />{this.props.user.data.address}
              </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />{this.props.user.data.email}
              </div>
                                        {/* <hr className="my-4" />
                                        <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                                        <a href="#">Show more</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 ">
                            <div className="card bg-secondary shadow">
                                <div className="card-header bg-white border-0">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h3 style={{textWeight:'700'}} className="mb-0 heading-small text-bold">My account</h3>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 style={{fontSize:'18px'}} className=" text-muted mb-4">User information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-username">Username</label>
                                                        <input value={this.state.user_name || ""} disabled type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" defaultValue="lucky.jesse" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                                                        <input value={this.state.email || ""} disabled type="email" id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                                        <input  onChange={this.fname.bind(this)} value={this.state.fname || ""} type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" defaultValue="Lucky" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                                                        <input  onChange={this.lname.bind(this)} value={this.state.lname || ""} type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" defaultValue="Jesse" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-address">Address</label>
                                                        <input  onChange={this.address.bind(this)} value={this.state.address || ""} id="input-address" className="form-control form-control-alternative" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-city">City</label>
                                                        <input  onChange={this.city.bind(this)} value={this.state.city || ""} type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" defaultValue="New York" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-country">Country</label>
                                                        <input  onChange={this.country.bind(this)} value={this.state.country || ""} type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" defaultValue="United States" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-country">Postal code</label>
                                                        <input onChange={this.post_code.bind(this)} value={this.state.post_code || ""} type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" htmlFor="input-address">Profile Image</label>
                                                        <input type="file"  onChange={this.profile_image.bind(this)}  id="input-address" className="form-control form-control-alternative"  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {
                                            this.state.error_string ?
                                            <p className="text-center text-danger">{this.state.error_string}</p>
                                            :null
                                        }
                                        <div className="mt-2">
                                            <button onClick={this.update_profile.bind(this)} type="submit" className="btn btn-success update_btn">
                                            {
                                               this.state.loading ?
                                               <div id="displayspinner" style={{ display: 'block' }}>
                                               <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                   <span className="sr-only">Loading...</span>
                                                </div>
                                                </div>
                                                : <>Update</>
                                           }

                                            </button>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        chanageAuthModal:(modal)=>{dispatch({type:'CHANGE_AUTH_MODAL',payload:modal})}
    }
}
export default connect(mapStateToProps)(Profile);