import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../Store/Action/index'

class Logout extends Component {
    componentDidMount () {
        console.log('i reached logout')
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);