import React from 'react'
import log from 'loglevel'
import reactBootstrap from 'react-bootstrap'

import createElement from '../../../../../../../library/create-element'

const button = createElement(reactBootstrap.Button)
const col = createElement(reactBootstrap.Col)
const grid = createElement(reactBootstrap.Grid)
const h1 = createElement('h1')
const loader = createElement(require('react-loader'))
const p = createElement('p')
const a = createElement('a')
const div = createElement('div')
const row = createElement(reactBootstrap.Row)

export default class Show extends React.Component {
  componentWillMount() {
    slug = this.props.params.slug
    token = this.props.session.token
    return this.props.handleShow(token, slug)
  }

  renderLoader() {
    return div(undefined, '')
  }

  renderSucceeded() {
    entry = this.props.show.entry
    return grid(undefined, row(undefined, col({
      xs: 12
    }, button({
      onClick: this.props.handleRedirectToPrevious
    }, "< Back"))), row(undefined, col({
      xs: 12
    }, h1(undefined, entry.title), p(undefined, entry.body))))
  }

  render() {
    if (this.props.show.isFetching) {
      return this.renderLoader()
    } else if (this.props.show.hasSucceeded) {
      return this.renderSucceeded()
    } else if (this.props.show.hasFailed) {
      return this.props.handleRedirectToList()
    } else {
      return this.renderLoader()
    }
  }
}
