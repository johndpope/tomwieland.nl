import Match from 'react-router/Match'
import React from 'react'
import log from 'loglevel'

import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'

export default (options) => {
  return (
    <div>
      <Navigation />

      <Match pattern="/admin" component={Dashboard} />

      {options.routes}
    </div>
  )
}
