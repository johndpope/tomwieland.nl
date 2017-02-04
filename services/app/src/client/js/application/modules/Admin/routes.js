// import log from 'loglevel'
import React from 'react'
import { Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'

export default (options) => {
  return (
    <div>
      <Navigation />

      <Route path="/admin" component={Dashboard} />

      {options.routes}
    </div>
  )
}
