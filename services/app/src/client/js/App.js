import React, { Component } from 'react'

import { getReducers, getRoutes } from './library/module'

import application from './application'
import createStore from './create-store'

import GetCookie from './application/modules/Session/actions/GetCookie'

// import reactElementToJSXString from 'react-element-to-jsx-string'

const reducers = global.reducers = getReducers(application)
const store = global.store = createStore(reducers)
const routes = global.routes = getRoutes(application, store)

// console.log('routes', reactElementToJSXString(routes))

export default class App extends Component {
  componentWillMount() {
    store.dispatch(GetCookie())
  }

  render() {
    return (
      <div>
        <h1>ABC13123</h1>
      </div>
    )

    // return routes
  }
}
