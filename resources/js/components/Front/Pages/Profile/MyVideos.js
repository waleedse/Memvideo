import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { descrition_image_url, thumb_image } from '../../../configs/baseapi';

class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos:[],
            loading:false,
            nodata:false
        };
    }
    componentDidMount(){
        if(this.props.user.is_login){
            this.setState({loading:true})
            let payload = {
                id : this.props.user.data.id
            }
            Axios.post('/api/watchvideos',payload).then(res=>{
                console.log(res);
                this.setState({loading:false})
                console.log(res.data.data);
                if(res.data.status == 200){
                    this.setState({
                        videos:res.data.data
                    })
                }else{
                    this.setState({
                        nodata:true
                    })
                }

            })
        }else{
            this.props.history.push('/login');
        }
    }
    render() {
        if(this.state.nodata){
            return(
                <div style={{marginTop: '20%' , marginBottom:'20%' }} className="text-center mt-5">
                    <div className="text-light mt-5">
                        <h1>Sorry, No Video Found.</h1>
                    </div>
                </div>
            )
        }
        return (
            <div class="table-responsive wishlist-table margin-bottom-none container-sm text-left" style={{paddingTop: '3%',paddingBottom:'20%'}}>
                <table class="table">
                    <thead>
                        <tr>
                            <th className="page_title">My Video</th>
                            {/* <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#"></a></th> */}
                        </tr>
                    </thead>
                    {
                        this.state.loading ?
                            <div id="displayspinner" style={{ display: 'block', marginLeft: '45%', marginTop: '10%' }}>
                                <div className="spinner-border text-light ml-2 spinner_format" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            <  >
                                <tbody>
                                    {
                                        this.state.videos.map((data, index) => {
                                            return (
                                                <tr className="card p-2" key={index}>
                                                    <td className="col-md-2"><img style={{width:'70px'}} src={thumb_image+data.video.thumb_image}/></td>
                                                    <td className="col-md-10">
                                                        <div class="product-item">
                                                        
                                                           
                                                            <div class="product-info">
                                                            

                                                               <h4 className="heading_title">{data.video.title} </h4>
                                                                <div class="text-lg text-medium ">
                                                                    {data.date}
                                                                    <span className=" bold title-text" style={{ float: 'right', fontSize: '25px' }}> 
                                                                    <a href={`/watch/${data.video.slug}`}><button className="btn btn-success">Play</button></a>
                                                                    </span>
                                                                    ${Number.parseFloat(data.purchase_type == 'rent' ? data.video.rent_a_video : data.video.buy).toFixed(2)}
                                                                    </div>
                                                                <div>Purchase Type : 
                                                    <div class="d-inline text-success"> {data.purchase_type}</div>
                                                                </div>
                                                               
                                                            </div>
                                                          
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </>
                    }

                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Videos);