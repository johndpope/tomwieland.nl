// import log from 'loglevel'
import CSSModules from 'react-css-modules'
import { Route } from 'react-router-dom'
import React from 'react'

import styles from './routes.module.scss'

import About from './components/About'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'

export default CSSModules(styles)((props) => {
  const {
    routes,
    styles,
  } = props

  return (
    <div>
      <Navigation />

      <div className={`${styles.pageContainer}`}>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />

        {routes}
      </div>
    </div>
  )
})
