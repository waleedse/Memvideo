import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SketchPicker } from 'react-color';

class GeneralSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            site_logo: '',
            site_banner: '',
            banner_video_id:0,
            privacy_policy:'',
            terms_text:'',
            watch_btn_bg:'',
            rent_btn_bg:'',
            buy_btn_bg:''
        };
    }
    componentDidMount() {
        Axios.post('/api/get_general_settings').then(res => {
            console.log(res);
            this.setState({
                site_banner: res.data.site_banner,
                site_logo: res.data.site_logo,
                banner_video_id: res.data.banner_video_id,
                privacy_policy: res.data.privacy_policy,
                terms_text: res.data.terms_text,
                buy_btn_bg:res.data.buy_btn_bg,
                rent_btn_bg:res.data.rent_btn_bg,
                watch_btn_bg:res.data.watch_btn_bg
            })
        })
    }
    handleEditor(e){
        this.setState({
            privacy_policy:e
        })
    }
    terms_text(e){
        this.setState({
            terms_text:e
        })
    }
    banner_video_id(e){
        this.setState({
            banner_video_id:e.target.value
        })
    }
    watch_btn_bg(e){
        this.setState({
            watch_btn_bg:e.hex
        })
    }
    buy_btn_bg(e){
        this.setState({
            buy_btn_bg:e.hex
        })
    }
    rent_btn_bg(e){
        this.setState({
            rent_btn_bg:e.hex
        })
    }
    
    uplaod_site_logo(event) {

        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            }
        }
        this.setState({
            m_v_loader: true,
        })
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
                const formData = new FormData();
                formData.append('file', images[0]);
                Axios.post('/api/upload_image', formData, Configs).then(res => {
                    console.log(res);

                    if (res.data.status == 200) {
                        // this.props.history.push('/admin/list-video');
                        this.setState({
                            site_logo: res.data.name
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Site Logo Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                this.setState({
                    description_image: images[0]
                })
            }, error => { console.error(error); });
        }

    }
    uplaod_site_banner(event) {

        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            }
        }
        this.setState({
            m_v_loader: true,
        })
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
                const formData = new FormData();
                formData.append('file', images[0]);
                Axios.post('/api/upload_image', formData, Configs).then(res => {
                    console.log(res);

                    if (res.data.status == 200) {
                        // this.props.history.push('/admin/list-video');
                        this.setState({
                            site_banner: res.data.name
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Site Logo Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                this.setState({
                    description_image: images[0]
                })
            }, error => { console.error(error); });
        }
    }
    save_settings() {
        console.log(this.state)
        Axios.post('/api/update_genral_settings', this.state).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'General Settings Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    render() {
       
        return (
            <div id="page-content">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">General Settings</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Site Logo</label>
                                    <input onChange={this.uplaod_site_logo.bind(this)} type="file" className="form-control" id="price" placeholder="Enter Price" name="price" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Home Page Banner</label>
                                    <input onChange={this.uplaod_site_banner.bind(this)} type="file" className="form-control" id="price" placeholder="Enter Price" name="price" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="price">Banner Video ID</label>
                                <input value={this.state.banner_video_id || ""} onChange={this.banner_video_id.bind(this)} type="text" className="form-control" id="id"  />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="price">Buy Button Background Color (#Hexa Value)</label>
                                <SketchPicker
                                    color={ this.state.buy_btn_bg }
                                    onChange={ this.buy_btn_bg.bind(this) }
                                />                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="price">Rent Button Background Color (#Hexa Value)</label>
                                <SketchPicker
                                    color={ this.state.rent_btn_bg }
                                    onChange={ this.rent_btn_bg.bind(this) }
                                />
                                {/* <input value={this.state.rent_btn_bg || ""} onChange={this.rent_btn_bg.bind(this)} type="text" className="form-control" id="id"  /> */}
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="price">Watch Trailer Button Backgroung Color (#Hexa Value)</label>
                                <SketchPicker
                                    color={ this.state.watch_btn_bg }
                                    onChange={ this.watch_btn_bg.bind(this) }
                                />
                                {/* <input value={this.state.watch_btn_bg || ""} onChange={this.watch_btn_bg.bind(this)} type="text" className="form-control" id="id"  /> */}
                            </div>
                        </div>
                        </div>  
                       
                        <div className="panel card p-3">
                            <div className="panel-heading">
                                <h3 className="panel-title">Privacy Policy</h3>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-12">
                                <ReactQuill theme="snow" value={this.state.privacy_policy} 
                                onChange={this.handleEditor.bind(this)} className="settings_editor" />
                                </div>
                            </div>
                        </div>
                        <div className="panel card p-3">
                            <div className="panel-heading">
                                <h3 className="panel-title">Terms and Conditions</h3>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-12">
                                <ReactQuill theme="snow" value={this.state.terms_text} 
                                onChange={this.terms_text.bind(this)} className="settings_editor" />
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button

                                onClick={this.save_settings.bind(this)} type="submit" className="btn btn-primary">
                                Save
                                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralSettings;