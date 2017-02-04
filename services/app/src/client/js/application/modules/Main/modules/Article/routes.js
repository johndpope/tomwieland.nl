import React from 'react'
import { Route } from 'react-router-dom'

import List from './components/List'
import Show from './components/Show'

export default (options) => {
  return (
    <div>
      <Route path="/articles" exact component={List} />
      <Route path="/articles/:slug" component={Show} />
    </div>
  )
}
