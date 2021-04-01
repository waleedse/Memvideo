import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible:false,
            nav_item_visible:0,
            nav_item_active: {
                main: 0,     
            },
            active_sub_item: 0
        }
    }
    
    componentDidMount(){
        
        $(document).ready( function() {
            var temp = false;
            $('.navbar-top-links').on('click', function(){
               if(temp){
                    $('nav').removeClass('nav_mobile');
                    temp = false;
               }else{
                    $('nav').addClass('nav_mobile');
                    temp = true;
               }
                
            });
        });

    }
    change_visible_item(id){
        let temp = 0;
        if(id == this.state.nav_item_visible){
            temp = 0;
        }else if(id != this.state.nav_item_visible){
            temp = id;
        }
        this.setState({
            nav_item_visible:temp
        })
    }
    active_item(_main) {
        
        let item = {
            main:_main
        }
        this.setState({
            nav_item_active: item,
        })
    }

    active_sub_item(_sub) {
        this.setState({
            active_sub_item: _sub,
        })
    }
    render() {
        return (
            <div>
                <nav id="mainnav-container">
                    <div id="mainnav">
                        <div id="mainnav-menu-wrap">
                            <div className="nano">
                                <div className="nano-content">
                                    <div id="mainnav-profile" className="mainnav-profile">
                                        <div className="profile-wrap text-center">
                                            <div className="pad-btm">
                                                {/* <img className="img-circle img-md" src=""
                                                    alt="Profile Picture" /> */}
                                            </div>
                                            <a href="#profile-nav" className="box-block" data-toggle="collapse" aria-expanded="false">
                                                <p className="mnp-name">abc</p>
                                                <span className="mnp-desc">admin@admin.com</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <ul id="mainnav-menu" className="list-group">
                                        <li className="list-header">Navigation</li>
                                        <li onClick={this.active_item.bind(this, 1)} className={this.state.nav_item_active.main == 1 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,1)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Dashboard</span>
                                            </a>
                                        </li>

                                        <li onClick={this.active_item.bind(this, 2)} className={this.state.nav_item_active.main == 2 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,2)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Upload Video</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 2 ?
                                                    <ul >
                                                        <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/video">Create</Link></li>
                                                        <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-video">List</Link></li>
                                                    </ul>
                                                :null
                                            }    
                                        </li>

                                        <li onClick={this.active_item.bind(this, 3)} className={this.state.nav_item_active.main == 3 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,3)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Category</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 3 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-category">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-category">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                            
                                        </li>
                                        <li onClick={this.active_item.bind(this, 4)} className={this.state.nav_item_active.main == 4 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,4)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Customers</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 4 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/customers-list">Lists</Link></li>
                                                    {/* <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-category">List</Link></li> */}
                                                </ul>
                                                :null
                                            }
                                            
                                        </li>
                                        <li onClick={this.active_item.bind(this, 5)} className={this.state.nav_item_active.main == 5 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,5)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Settings</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 5 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/general-settings">General Settings</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/faqs">Manage Faqs</Link></li>

                                                </ul>
                                                :null
                                            }
                                            
                                        </li>
                                        <li onClick={this.active_item.bind(this, 6)} className={this.state.nav_item_active.main == 6 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,6)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Promocode</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 6 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-promocode">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-promos">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Sidebar;