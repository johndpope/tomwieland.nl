import React from 'react'
import { Route } from 'react-router-dom'

import List from './components/List'
import ListByUser from './components/ListByUser'
import ListByTag from './components/ListByTag'
import Show from './components/Show'

export default (options) => {
  return (
    <div>
      <Route path="/articles" exact component={List} />
      <Route path="/articles/:slug" exact component={Show} />
      <Route path="/articles/by/:username" exact component={ListByUser} />
      <Route path="/articles/tagged/:label" exact component={ListByTag} />
    </div>
  )
}
