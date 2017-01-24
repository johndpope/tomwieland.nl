import Match from 'react-router/Match'
import React from 'react'
import log from 'loglevel'

import Graphiql from '../../../library/components/Graphiql'

import About from './components/About'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'

export default (options) => {
  return (
    <div>
      <Navigation />

      <Match pattern="/" exactly component={Home} />
      <Match pattern="/about" component={About} />
      <Match pattern="/contact" component={Contact} />
      <Match pattern="/login" component={Login} />
      <Match pattern="/graphiql" component={Graphiql} />

      {options.routes}
    </div>
  )
}
