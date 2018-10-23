import React, { Component } from 'react' 
import BreadCrumb from '../components/breadcrumb/breadcrumb'

class Home extends Component { 

    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <BreadCrumb parentLink="#" parentTitle="Dashboard" leaf="My Dashboard" />
                    <div className="main-body">
                        <h2>Welcome To Dashboard</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home 