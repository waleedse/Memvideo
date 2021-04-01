import React, { Component } from 'react';
import Header from '../navigation/header';
import Sidebar from '../navigation/sidebar';

import {Route, BrowserRouter} from 'react-router-dom';

import CategoryCreate from '../category/create';
import CategoryEdit from '../category/edit';
import CategoryList from '../category/index';

import VideoList from '../videos/index';
import VideoCreate from '../videos/create';
import VideoEdit from '../videos/edit';

import PromocodeList from '../promocode/index';
import PromocodeCreate from '../promocode/create'; 
import PromocodeEdit from '../promocode/edit';

import CustomerList from '../Customer/list';

import Faqs from '../Settings/FaqsPage';
import AddFaq from '../Settings/AddFaqs';
import EditFaq from '../Settings/edit';
import GeneralSettings from '../Settings/GeneralSettings';
class Main extends Component {
    render() {
        return (
            <div id="container" className="effect aside-float aside-bright mainnav-lg">
                <Header></Header>
                <div className="boxed">
                    <div id="content-container">
                        <Route path="/admin/create-category" component={CategoryCreate}></Route>
                        <Route path="/admin/edit-category/:id" component={CategoryEdit}></Route>
                        <Route path="/admin/list-category" component={CategoryList}></Route>

                        <Route path="/admin/list-video" component={VideoList}></Route>
                        <Route path="/admin/video" component={VideoCreate}></Route>
                        <Route path="/admin/edit-video/:id" component={VideoEdit}></Route>

                        <Route path="/admin/list-promos" component={PromocodeList}></Route>
                        <Route path="/admin/create-promocode" component={PromocodeCreate}></Route>
                        <Route path="/admin/promocode-detail/:id" component={PromocodeEdit}></Route>
                        
                        <Route path="/admin/customers-list" component={CustomerList}></Route>
                        <Route path="/admin/general-settings" component={GeneralSettings}></Route>

                        <Route path="/admin/add-faq" component={AddFaq}></Route>
                        <Route path="/admin/faqs" component={Faqs}></Route>
                        <Route path="/admin/faq-detail/:id" component={EditFaq}></Route>
                        
                    </div>
                    <Sidebar></Sidebar>
                </div>
            </div>
        );
    }
}

export default Main;