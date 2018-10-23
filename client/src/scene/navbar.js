import React, { Component } from 'react' 
import BreadCrumb from '../components/breadcrumb/breadcrumb'

class Navbar extends Component { 
    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Navbar" />
                    <div className="main-body">
                        <h2>Welcome To Navbar</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar