import React , { Component } from 'react';

class Footer extends Component {
    render() {
        return(
            <section id="footerfront">
                <div className="container">
                    {/* <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-2"></div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <div>
                                <h4>On Demand</h4>
                                <ul className="list-unstyled quick-links">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/">Collections</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <div>
                                <h4>For Viewers</h4>
                                <ul className="list-unstyled quick-links">
                                    <li><a href="/join">Join</a></li>
                                    <li><a href="/login">Log In</a></li>
                                    <li><a href="/">Watch</a></li>
                                    <li><a href="/">Go To Memvod</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-2"></div>
                    </div> */}
                    <hr/>	
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-white">
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <p><a href="#">© 2021 Memvod</a> All rights reserved.</p>
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-1">
                                <a  href="/">Home</a>
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-2">
                                <a  href="/terms-and-conditions">Terms and Conditions</a>
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-2">
                                <a href="/privacy-policy">Privacy Policy</a>
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-1">
                                <a href="/faqs">FAQ's</a> 
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-1">
                                <a href="/contact-us">Contact Us</a> 
                            </div>
                            <div className="col-xs-12 col-sm-1 col-md-1">
                                {/* <a>Cookies</a> */}
                            </div>
                        </div>
                    </div>	
                </div>
        </section>

        )
    }
}

export default Footer;
