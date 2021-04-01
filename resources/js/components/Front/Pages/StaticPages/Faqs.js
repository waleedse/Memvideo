import React, { Component } from 'react';
import Axios from 'axios'
class Faq extends Component {
    constructor(props) {
        super(props);
        this.state={
            faqs:[]
        }
    }
    componentDidMount(){
        Axios.post('/api/get_all_faqs').then(res=>{
            console.log(res);
                this.setState({
                    faqs: res.data
                })
        })
    }
    change_faq_state(ind){
        let temp_arr = this.state.faqs;
        temp_arr.map((data,index)=>{
            if(index == ind){
                data.state = ! data.state;
            }
        })

        this.setState({
            faqs:temp_arr
        })
    }
    render() {
        return (
            <div className="contact-section p-5">
                <div className=" p-5 container px-5">
                    <h1 className=" py-5 title-text ">FAQ's</h1>
                    {
                        this.state.faqs.map((data,index)=>{
                            return(
                                <div className="card mt-2">
                            <h4 onClick={this.change_faq_state.bind(this,index)} className="  card-title card_title_bg">{data.question}
                            <span style={{float:'right'}}>  <i className={data.state ? "fas fa-chevron-up" : "fas fa-chevron-down"} ></i></span></h4>
                                {
                                    data.state?
                                    <div className="card-body">
                                        <h6 className="card-body-text">
                                            {data.answer}
                                        </h6>
                                    </div>:null
                                }
                            </div>
                            )
                        })
                    }
                    
                </div>
                <div className="mt-5">
                   
                    </div>
            </div>
            
        );
    }
}

export default Faq;