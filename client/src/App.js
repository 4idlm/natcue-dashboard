import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css'
import * as actions from './Store/Action/index'
import Auth from './scene/Auth/Auth'
import AuthedRoutes from './scene'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <AuthedRoutes />
          <Route path="/" component={Auth} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
