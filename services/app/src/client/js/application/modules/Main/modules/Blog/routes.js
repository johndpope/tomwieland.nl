import Match from 'react-router/Match'
import React from 'react'

import List from './components/List'
import Show from './components/Show'
import Container from './components/Container'

export default (options) => {
  return (
    <div>
      <Match pattern="/blog" component={List} />
      <Match pattern="/blog/:slug" component={Show} />
    </div>
  )
}
