import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class LeftNav extends Component {

    render() {
        return (
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                    <Link className="nav-link" to="/">
                        <i className="fa fa-fw fa-dashboard"></i>
                        <span className="nav-link-text">Dashboard</span>
                    </Link>
                </li>
                {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                    <Link className="nav-link" to="/consultationreport">
                        <i className="fa fa-fw fa-area-chart"></i>
                        <span className="nav-link-text">Reports</span>
                    </Link>
                </li> */}
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Doctors">
                    <Link className="nav-link" to="/ManageDoctor">
                        <i className="fa fa-fw fa-area-chart"></i>
                        <span className="nav-link-text">ManageDoctor</span>
                    </Link>
                </li>
                {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Office">
                    <Link className="nav-link" to="/Office">
                        <i className="fa fa-fw fa-area-chart"></i>
                        <span className="nav-link-text">Office Profile</span>
                    </Link>
                </li> */}
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Office">
                    <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseOffice" data-parent="#exampleAccordion">
                        <i className="fa fa-fw fa-wrench"></i>
                        <span className="nav-link-text">Office</span>
                    </a>
                    <ul className="sidenav-second-level collapse" id="collapseOffice">
                        <li>
                            <Link className="nav-link" to="/Office">Office profile</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/Schedule">Office Schedule</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
                    <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
                        <i className="fa fa-fw fa-wrench"></i>
                        <span className="nav-link-text">Reports</span>
                    </a>
                    <ul className="sidenav-second-level collapse" id="collapseComponents">
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                            <Link className="nav-link" to="/consultationreport">
                                <i className="fa fa-fw fa-area-chart"></i>
                                <span className="nav-link-text">Consultation Report</span>
                            </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                            <Link className="nav-link" to="/pharmareport">
                                <i className="fa fa-fw fa-area-chart"></i>
                                <span className="nav-link-text">Pharma Report</span>
                            </Link>
                        </li> 
                    </ul>
                </li>
                
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Office">
                    <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapsecoupon" data-parent="#exampleAccordion">
                        <i className="fa fa-fw fa-wrench"></i>
                        <span className="nav-link-text">Coupons</span>
                    </a>
                    <ul className="sidenav-second-level collapse" id="collapsecoupon">
                        <li>
                            <Link className="nav-link" to="/Managecoupon">Manage coupon</Link>
                        </li>
                        
                    </ul>
                </li>

                {/* notification links */}

                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Office">
                    <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapsenotification" data-parent="#exampleAccordion">
                        <i className="fa fa-fw fa-bell-o"></i>
                        <span className="nav-link-text">ManageNotification</span>
                    </a>
                    <ul className="sidenav-second-level collapse" id="collapsenotification">
                        <li>
                            <Link className="nav-link" to="/Notification">Notification</Link>
                        </li>
                        
                    </ul>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Health Chart">
                    <Link className="nav-link" to="/HealthChart">
                        <i className="fa fa-fw fa-area-chart"></i>
                        <span className="nav-link-text">Health Chart</span>
                    </Link>
                </li>

            </ul>
        )
    }
}