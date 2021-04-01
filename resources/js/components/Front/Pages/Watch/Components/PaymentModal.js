import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { thumb_image } from '../../../../configs/baseapi';
import Swal from 'sweetalert2';
class PaymentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promocode: '',
            video: [],
            video_price: 0,
            discount: 0,
            totals: 0,
            error_string: '',
            loading_btn: false,
            success_string:''
        };
    }
    componentDidMount() {
        if (this.props.purchase_type == 'rent') {
            this.setState({
                video_price: this.props.video.rent_a_video,
                totals: this.props.video.rent_a_video,
            })
        } else {
            this.setState({
                video_price: this.props.video.buy_video,
                totals: this.props.video.buy_video,
            })
        }

    }
    hide_modal() {
        this.props.change_payment_modal(false)
    }
    charge_payment(token) {
        let payload = {
            customer_id: this.props.user.data.id,
            purchase_type: this.props.purchase_type,
            video_id: this.props.video.id,
            stripeToken: token,
            totals: this.state.totals,
            discount: this.state.discount
        }
        this.setState({
            loading_btn: true
        })
        console.log(payload);
        Axios.post('/api/charge_payment', payload).then(res => {
            console.log(res);
            this.setState({
                loading_btn: false,
                error_string:'',
                success_string:''
            })
            if (res.data.status == 200) {
                this.setState({
                    success_string:'Payment Charged SuccessFull.'
                })
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            } else {
                this.setState({
                    error_string: res.data.msg
                })
            }
        })
    }
    promocode(e) {
        this.setState({ promocode: e.target.value })
    }
    apply_promocode() {
        let payload = {
            promocode_id: this.state.promocode,
            customer_id: this.props.user.data.id
        }
        this.setState({
            error_string:'',
                success_string:''
        })
        Axios.post('/api/promocode-apply', payload).then(res => {
            console.log(res);
            if (res.data.status == 200) {
                this.setState({
                    totals: parseFloat(this.state.video_price) - parseFloat(res.data.data.price),
                    discount: res.data.data.price,
                    success_string:'PromoCode Applied.'
                })
                
            } else {
                this.setState({
                    error_string: res.data.msg
                })
            }

        })
    }
    render() {
        return (
            <div className="homemodal">
                <div className="homemodal_card">
                    <div className="cross_div">
                        <img className="cross_icon p-3" onClick={this.hide_modal.bind(this)} src="https://img.icons8.com/ios/35/000000/multiply.png" />
                        <h1 className="modal_title">{this.props.title}</h1>
                        <hr className="hrmargin" />

                        <div className="video_purchase_details mt-3">
                            <div classNam="row">
                                <div className="col-md-4 ">
                                    <img className="purchase_thumb_image purchase_thumb_image2" src={thumb_image + this.props.video.thumb_image}></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="title_div">
                                        <h2 className="purchase_modal_title text-dark text-center">{this.props.video.title}</h2>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8 mt-3">
                                            <div className="ibox">
                                                <div className="ibox-content">
                                                    <div>
                                                        Price
                                                    <span className="font-bold" style={{ float: 'right' }}>
                                                            <strong>
                                                                ${Number.parseFloat(this.state.video_price).toFixed(2)} </strong>
                                                        </span>
                                                    </div>
                                                    <div>
                                                        Discount
                                                    <span className="font-bold" style={{ float: 'right' }}>
                                                            <strong>  ${Number.parseFloat(this.state.discount).toFixed(2)} </strong>
                                                        </span>
                                                    </div>
                                                    <hr />
                                                    <div>

                                                        <span  >
                                                            Total
                                                    <strong>   </strong>
                                                        </span>
                                                        <h2 style={{ float: 'right' }} className="font-bold">
                                                            ${Number.parseFloat(this.state.totals).toFixed(2)}
                                                        </h2>
                                                    </div>


                                                    <hr />
                                                    {
                                                        this.props.purchase_type == 'rent' ?
                                                            <div className="row">
                                                                {
                                                                    this.state.error_string != '' ?
                                                                        <p className="text-danger text-center">{this.state.error_string}</p>
                                                                        : null
                                                                }
                                                                {
                                                                    this.state.success_string != '' ?
                                                                    <><br></br>
                                                                        <p className="text-success text-center">{this.state.success_string}</p>
                                                                        </>
                                                                        : null
                                                                }
                                                                <div className="col-md-8 mt-2">
                                                                    <input onChange={this.promocode.bind(this)} type="text" placeholder="Enter Promocode" className="form-control"></input>
                                                                </div>
                                                                <div className="col-md-4 text-center mt-2">
                                                                    <button onClick={this.apply_promocode.bind(this)} className="btn btn-success apply_btn">Apply</button>
                                                                </div>
                                                            </div> : null

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <StripeCheckout

                                        //  name="Aldyar Meat Company" // the pop-in header title

                                        // the pop-in header image (default none)
                                        ComponentClass="div"
                                        stripeKey="pk_test_51I7E9bIcgmjOoI3ve5lgPLPNkb3uUChOgSVFBcdXNEaW9JEYQdSeMMV2U4IgbkTadNmuwBeX0v4xZbZFEMYsQKCC006dv4evHj"
                                        token={this.charge_payment.bind(this)}
                                        billingAddress
                                        shippingAddress
                                        currency="USD"
                                        amount={200 * 100}
                                    >

                                        <button style={{ fontSize: '16px', marginTop: '20px' }} className="col-sm-12 featureButton  ">
                                            {
                                                this.state.loading_btn ?
                                                    <div className="spinner-border textwhite text-light ml-2 " style={{ width: '25px', height: '25px', color: 'white' }} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <>
                                                        Pay  ${Number.parseFloat(this.state.totals).toFixed(2)}
                                                    </>
                                            }
                                        </button>
                                    </StripeCheckout>
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
    return {
        payment_modal: state.payment_modal,
        user: state.user
    }
}
const mapDistapatchToProps = (dispatch) => {
    return {
        change_payment_modal: (modal) => { dispatch({ type: 'CHANGE_PAYMENT_MODAL', payload: modal }) }
    }
}
export default connect(mapStateToProps, mapDistapatchToProps)(PaymentModal);