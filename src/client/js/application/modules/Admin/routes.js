
import React from 'react'
el = bind$(React, 'createElement')
import log from 'loglevel'
import reactRouter from 'react-router'
import createElement from '../../../library/create-element'
indexRoute = createElement(reactRouter.IndexRoute)
route = createElement(reactRouter.Route)
import UserIsAuthenticated from '../../../library/auth/UserIsAuthenticated'
Container = UserIsAuthenticated(require('./components/Container'))
import Dashboard from './components/Dashboard'
export default (it) => {
  log.debug('modules/admin/routes')
  return route({
    path: 'admin',
    component: Container,
    key: it.key
  }, indexRoute({
    component: Dashboard
  }), it.routes)
}
function bind$(obj, key, target){
  return () => { return (target || obj)[key].apply(obj, arguments) }
}
