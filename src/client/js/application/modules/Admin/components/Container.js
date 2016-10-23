import React from 'react'

import Navigation from './Navigation'

export default ({ children, history, location, params, route, routeParams, routes }) =>
  <div>
    <Navigation {...{ history, location, params, route, routeParams, routes }} />
    {children}
  </div>
