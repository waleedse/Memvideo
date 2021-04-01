import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
// import Fs, { appendFileSync } from 'fs';
// import FormFileInput from 'react-bootstrap/esm/FormFileInput';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category_id: '',
            thumb_image: '',
            description_image: '',
            t_video: '',
            m_video: '',
            categories: [],
            display: false,
            loading: false,
            m_v_loader: false,
            m_video_url: '',
            t_video_url: '',
            t_v_loader: false,
            error_string:'',
            video_rent:0,
            buy_video:0,
            t_v_progress:0,
            m_v_progress:0
        };
    }

    componentDidMount() {
        Axios.get(`/api/category`, {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }).then(res => {
            if (res.data.status == 200) {
                this.setState({
                    categories: res.data.categories
                })
            }
        })
    }
    getTitle(event) {
        this.setState({
            title: event.target.value
        })
    }
    rent_video(event) {
        this.setState({
            video_rent: event.target.value
        })
    }
    buy_video(event) {
        this.setState({
            buy_video: event.target.value
        })
    }
    getDescription(event) {
        this.setState({
            description: event.target.value
        });
    }
    
    getThumbImage(event) {
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
                    thumb_image: images[0]
                })
            }, error => { console.error(error); });
        }
    }

    getCategory(event) {
        this.setState({
            category_id: event.target.value
        })
    }

    getDescriptionImage(event) {
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
                    description_image: images[0]
                })
            }, error => { console.error(error); });
        }
    }

    getUploadTrailer(event) {
        const formData = new FormData();
        formData.append('t_video', event.target.files[0]);
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {this.setState({
               t_v_progress: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            })}
        }
        this.setState({
            t_v_loader: true,
        })
        Axios.post('/api/t-video-upload', formData, Configs).then(res => {
            console.log(res);
            this.setState({
                t_v_loader: false,
                t_video_url: res.data.url
            })
            if (res.data.status == 200) {
                // this.props.history.push('/admin/list-video');
                Swal.fire({
                    icon: 'success',
                    title: 'Video Added Successfully',
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

    }

    getUploadVideo(event) {
        const formData = new FormData();
        formData.append('m_video', event.target.files[0]);
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {this.setState({
                m_v_progress: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
             })}
        }
        this.setState({
            m_v_loader: true,
        })
        Axios.post('/api/m-video-upload', formData, Configs).then(res => {
            console.log(res);
            this.setState({
                m_v_loader: false,
                m_video_url: res.data.url
            })
            if (res.data.status == 200) {
                // this.props.history.push('/admin/list-video');
                Swal.fire({
                    icon: 'success',
                    title: 'Video Added Successfully',
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
    }

    createVideo(event) {
        event.preventDefault();

        if(this.state.t_video_url != ''){
            let senderData = {
                title: this.state.title,
                description: this.state.description,
                category_id: this.state.category_id,
                thumb_image: this.state.thumb_image,
                description_image: this.state.description_image,
                t_video: this.state.t_video_url,
                m_video: this.state.m_video_url,
                rent_video:this.state.video_rent,
                buy_video:this.state.buy_video
            }
            console.log(senderData);
            let Configs = {
                headers: {
                    token: window.localStorage.getItem('testapistring'),
                }
            }
            this.setState({
                loading: true,

            })
            Axios.post('/api/video-upload', senderData, Configs).then(res => {
                console.log(res);
                this.setState({
                    loading: false
                })
                if (res.data.status == 200) {
                    this.props.history.push('/admin/list-video');
                    Swal.fire({
                        icon: 'success',
                        title: 'Video Created Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    this.setState({
                        error_string:res.data.msg
                    })
                }
            })
        }else {
            this.setState({
                error_string:'Error-Please Upload Trailer to save.'
            })
        }
    }

    render() {
        return (

            <div id="page-content">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-bordered">
                            <div className="panel-heading">
                                <h3 className="panel-title">Video Upload</h3>
                            </div>
                            <div className="panel-body">
                                <div className="panel">
                                    <form encType="multipart/form-data">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Title:</label>
                                                        <input onChange={this.getTitle.bind(this)} type="text" className="form-control" id="title" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Category:</label>
                                                        <select className="form-control" name="cat_id" value={this.state.cat_id} onChange={this.getCategory.bind(this)}>
                                                            <option value="">Select</option>
                                                            { 
                                                                this.state.categories.map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data.id}>{data.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Rent Video Price</label>
                                                        <input onChange={this.rent_video.bind(this)} type="text" className="form-control" id="title" name="title" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                <div className="form-group">
                                                        <label htmlFor="price">Buy Video Price</label>
                                                        <input onChange={this.buy_video.bind(this)} type="text" className="form-control" id="title"  name="title" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Description:</label>
                                                        <textarea className="form-control"  name="description" onChange={this.getDescription.bind(this)}></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-3 control-label">Thumb Image</label>
                                                        <div className="col-md-9">
                                                            <span className="pull-left btn btn-primary btn-file">
                                                                Thumb Image... <input type="file" onChange={this.getThumbImage.bind(this)} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-3 control-label">Detail Image</label>
                                                        <div className="col-md-9">
                                                            <span className="pull-left btn btn-info btn-file">
                                                                Detail Image...&nbsp; <input type="file" onChange={this.getDescriptionImage.bind(this)} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <br />
                                            <br />

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="col-md-3 control-label">Upload Trailer</label>
                                                        <div className="col-md-9">
                                                            <span className="pull-left btn btn-warning btn-file">

                                                                {
                                                                    this.state.t_v_loader ?
                                                                        <div class="col-sm-6 col-md-4 col-lg-3">

                                                                            <div class="load8">
                                                                                <div class="loader"></div>
                                                                                
                                                                            </div>
                                                                            {this.state.t_v_progress}%
                                                                        </div>


                                                                        :
                                                                        <span>
                                                                            {
                                                                                this.state.t_video_url == '' ?
                                                                                    <>Upload Video...</> :
                                                                                    <>Uploaded</>
                                                                            }
                                                                        </span>

                                                                }
                                                                <input type="file" onChange={this.getUploadTrailer.bind(this)} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    {/* <div className="form-group">
                                                        <label className="col-md-3 control-label">Upload Video</label>
                                                        <div className="col-md-9">
                                                            <span className="pull-left btn btn-success btn-file">
                                                                {
                                                                    this.state.m_v_loader ?
                                                                        <div class="col-sm-6 col-md-4 col-lg-3">

                                                                            <div class="load8">
                                                                                <div class="loader"></div>
                                                                            </div>
                                                                            {this.state.m_v_progress}%
                                                                        </div>

                                                                        :
                                                                        <span>
                                                                            {
                                                                                this.state.m_video_url == '' ?
                                                                                    <>Upload Video...</> :
                                                                                    <>Uploaded</>
                                                                            }
                                                                        </span>

                                                                }
                                                                <input onChange={this.getUploadVideo.bind(this)} type="file" />
                                                            </span>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>

                                        </div>
                                        {
                                            this.state.error_string != '' ?
                                            <div className="text-center">
                                                <p className="text-danger">{this.state.error_string}</p>
                                            </div>
                                            :null
                                        }
                                        <div className="panel-footer text-right">
                                            <button 
                                            disabled={this.state.t_v_loader}
                                            onClick={this.createVideo.bind(this)} type="submit" className="btn btn-primary">
                                                {
                                                    this.state.loading ?
                                                        <div class="col-sm-6 col-md-4 col-lg-3">

                                                            <div class="load8">
                                                                <div class="loader"></div>
                                                            </div>
                                                        </div>

                                                        :
                                                        <>Save</>
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

export default Create;