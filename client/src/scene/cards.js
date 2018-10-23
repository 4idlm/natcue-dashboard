import React from 'react'  
import BreadCrumb from '../components/breadcrumb/breadcrumb'

class Cards extends React.Component {
    render() {

        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Cards" />
                    <div className="main-body">
                        <h2>Welcome To Cards</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards