import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {thumb_image} from '../../configs/baseapi'
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            search_string:''
        }
    }
    componentDidMount(){
        Axios.get(`/api/video`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
                this.setState({
                    videos: res.data
                })
        })
    }

    
    search(e){
        this.setState({
            search_string:e.target.value
        })
    }
    search_records(){
        // let senderdata = {
        //     string:this.state.search_string
        // }
        // Axios.post('/api/search_orders',senderdata).then(res=>{
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    }

    deleteVideo(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-video-record',data).then(res=>{
            this.componentDidMount();
        })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Videos List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Video ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Thumb Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.videos.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.id}</td>
                                                            <td>{data.title}</td>
                                                            <td>{data.description}</td>
                                                            <td><img style={{width: "15%"}} src={thumb_image+data.thumb_image}></img></td>
                                                            <td>
                                                                <Link to={`/admin/edit-video/${data.id}`}><button className="btn btn-outline-primary"> <i  className="fa fa-pencil"> </i></button></Link>
                                                                <button onClick={this.deleteVideo.bind(this, data.id)} className="btn btn-outline-primary"> <i  className="fa fa-trash"> </i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.videos.length == 0 ? 
                                                        <tr><td colSpan="5">No records founded</td></tr>:null
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Index;