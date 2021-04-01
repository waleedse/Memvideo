import React, {Component} from 'react';
import Axios from 'axios';
import Main from '../admin/container/main';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    componentDidMount() {
        let senderData = {
            token: window.localStorage.getItem('testapistring'),
        }
        Axios.post('/api/check-auth-admin', senderData).then(res=>{
            console.log(res);
            console.log(res.data.status);
            if(res.data.status == 200) {
                console.log('here');
                this.setState({
                    display: true
                })
            } else {
                this.props.history.push('/admin/login'); 
            }
        })
    }

    render() {
        return(
            <div id="adminpanel">
                {
                    this.state.display ? 
                        <Main></Main>
                    : 
                    <>
                    {/* <div className="loader_content">
                        <div className="loader_center">
                            <div class="load8">
                                <div class="loader"></div>
                            </div>
                        </div>
                    </div> */}
                    </>
                }
            </div>
        );
    }

    
}

export default Index;