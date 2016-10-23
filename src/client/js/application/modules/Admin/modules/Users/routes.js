
import React from 'react'
el = bind$(React, 'createElement')
import log from 'loglevel'
import reactRouter from 'react-router'
import createElement from '../../../../../library/create-element'
indexRoute = createElement(reactRouter.IndexRoute)
route = createElement(reactRouter.Route)
import Add from './components/Add'
import Container from './components/Container'
import Edit from './components/Edit'
import List from './components/List'
import Show from './components/Show'
export default (it) => {
  log.debug('modules/admin/routes')
  return route({
    path: 'users',
    component: Container,
    key: it.key
  }, indexRoute({
    component: List
  }), route({
    path: 'add',
    component: Add
  }), route({
    path: ':email'
  }, indexRoute({
    component: Show
  }), route({
    path: 'edit',
    component: Edit
  }), it.routes))
}
function bind$(obj, key, target){
  return () => { return (target || obj)[key].apply(obj, arguments) }
}
