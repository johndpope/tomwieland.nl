import React, { Component } from 'react'
import log from 'loglevel'

import GetCookie from './application/modules/Session/actionCreators/GetCookie'

// This file exists to wrap the components for Hot Module Reloading.
export default class ApplicationContainer extends Component {
  componentWillMount() {
    this.props.store.dispatch(GetCookie())
  }

  render() {
    return this.props.routes
  }
}
