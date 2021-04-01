import React, { Component } from 'react';
import Axios from 'axios'

class Header extends Component {
    
    render() {
        return (
            <header id="navbar">
                <div id="navbar-container" className="boxed">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                            <div className="brand-title">
                              
                                <span className="brand-text">Memvod</span>
                            </div>
                        </a>
                    </div>
                    <div className="navbar-content">
                        <ul className="nav navbar-top-links">
                            <li className="tgl-menu-btn">
                            <a className="mainnav-toggle" href="#">
                                <i className="demo-pli-list-view" />
                            </a>
                            </li>
                            <li>
                            <div className="custom-search-form">
                                <label className="btn btn-trans" htmlFor="search-input" data-toggle="collapse" data-target="#nav-searchbox">
                                <i className="demo-pli-magnifi-glass" />
                                </label>
                                <form>
                                <div className="search-container collapse" id="nav-searchbox">
                                    <input id="search-input" type="text" className="form-control" placeholder="Type for search..." />
                                </div>
                                </form>
                            </div>
                            </li>
                        </ul>
                    <ul className="nav navbar-top-links">
                        <li className="mega-dropdown">
                        
                            <div className="dropdown-menu mega-dropdown-menu">
                                <div className="row">
                                    <div className="col-sm-4 col-md-3">
                                        
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="demo-pli-bell" />
                                <span className="badge badge-header badge-danger" />
                            </a>
                        
                        </li>
                        <li id="dropdown-user" className="dropdown">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
                                <span className="ic-user pull-right">
                                
                                <i className="demo-pli-male" />
                                </span>
                                
                            </a>
                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                                <ul className="head-list">
                                <li>
                                    <a href="pages-login.html"><i className="demo-pli-unlock icon-lg icon-fw" /> Logout</a>
                                </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;