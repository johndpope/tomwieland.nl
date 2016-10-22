import Match from 'react-router/Match'
import React from 'react'

import Graphiql from '../../../library/components/Graphiql'

import About from './components/About'
import Contact from './components/Contact'
import Container from './components/Container'
import Home from './components/Home'
import Login from './components/Login'

export default (options) => {
  return (
    <div>
      <Match exactly pattern="/" component={Home} />
      <Match pattern="/about" component={About} />
      <Match pattern="/contact" component={Contact} />
      <Match pattern="/login" component={Login} />
      <Match pattern="/graphiql" component={Graphiql} />
      {options.routes}
    </div>
  )
}
