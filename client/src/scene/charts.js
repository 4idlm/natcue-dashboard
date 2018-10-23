import React from 'react'
import BreadCrumb from '../components/breadcrumb/breadcrumb'

class Charts extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Charts" />
                    <div className="main-body">
                        <h2>Welcome To Charts</h2>
                    </div>
                </div>

            </div>
        );
    }
}

export default Charts 