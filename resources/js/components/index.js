import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Admin_Login from './admin/login/login'; 
import AdminIndex from './admin/index';
import FrontIndex from './Front/Index/index';
import '../app.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Front/Redux/reducer';
import Page404 from './Front/Pages/404/PageNotFound'
const store = createStore(reducer);
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paths:['/profile','/watch/:slug','/search/:query',
            '/my-videos', '/contact-us','/privacy-policy',
            '/terms-and-conditions','/faqs']
        };
    }
     
    render() {
        return(
            
            
                <div id="main-div">
                    <BrowserRouter>
                    <Switch>
                    {
                        this.state.paths.map((data,index)=>{
                            return(
                                <Route key={index} path={data} component={FrontIndex}></Route>
                            )
                        })
                    }
                    <Route exact path="/admin/login" component={Admin_Login} />
                    <Route  path="/admin"  component={AdminIndex}/>
                    <Route exact path="/" component={FrontIndex}></Route>
                    <Route exact path="/login" component={FrontIndex}></Route>
                    <Route exact path="/join" component={FrontIndex}></Route>
                    <Route path='' exact={true} component={Page404} />

                    </Switch>
                    </BrowserRouter>
                </div>
               
           
        );
    }
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}> <Index /> </Provider>, document.getElementById('root'));
}