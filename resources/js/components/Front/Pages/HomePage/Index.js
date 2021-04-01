import React, { Component } from 'react';
import Banner from './Components/Banner';
import Videos from './Components/Videos';
class HomeIndex extends Component {
    render() { 
        return (
            <div className="homepage mb-5">
                {/* <Banner></Banner> */}
                {/* <div className="text-center  py-4">
                    {/* <h4 className="home_text">Here you'll find the best of the best films and series being sold 
                     On Demand, handpicked each week 
                    by our curation team.</h4> 
                </div> */}
                <Videos {...this.props}></Videos>
            </div>
        );
    }
}
 
export default HomeIndex;