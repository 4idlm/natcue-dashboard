import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import '../style/sb_admin.min.css'
import '../style/sb_admin.css'
import '../style/bootstrap/css/bootstrap.min.css'
import '../style/font-awesome/css/font-awesome.min.css'
import '../style/datatables/dataTables.bootstrap4.css'
import Home from './home'
import ConsultationReport from './ConsultationReport/consultationReport'
import PharmaReport from './PharmaReport/pharmaReport'
import ManageDoctor from './ManageDoctor/ManageDoctor'
import Office from './Office/Office'
import Schedule from './Schedule/Schedule'
import HealthChart from './HealthChart/HealthChart'
import Charts from './charts'
import Navbar from './navbar'
import Cards from './cards'
import TopNav from '../components/topnav/topnav'
import Logout from '../scene/Auth/Logout/Logout'
import Coupon from '../scene/ManageCoupon/coupon'
import Notification from '../scene/Notification/Notification';

class Layout extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <TopNav>
                <Route exact path="/" component={Home} />
                <Route path="/consultationreport" component={ConsultationReport} />
                <Route path="/pharmareport" component={PharmaReport} />
                <Route path="/ManageDoctor" component={ManageDoctor} />
                <Route path="/Managecoupon" component={Coupon} />
                <Route path="/Office" component={Office} />
                <Route path="/Schedule" component={Schedule} />
                <Route path="/HealthChart" component={HealthChart} />
                <Route path="/charts" component={Charts} />
                <Route path="/navbar" component={Navbar} />
                <Route path="/cards" component={Cards} />
                <Route path="/logout" component={Logout} />
                <Route path="/Notification" component={Notification}/>
                
            </TopNav>
        );
    }
}

export default Layout