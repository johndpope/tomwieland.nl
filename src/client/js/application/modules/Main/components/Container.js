import React from 'react'

import Navigation from './Navigation'

export default ({ children, history, location, params, route, routeParams, routes }) =>
  <div>
    <Navigation
      history={history}
      location={location}
      params={params}
      route={route}
      routeParams={routeParams}
      routes={routes}
    />
    {children}
  </div>
