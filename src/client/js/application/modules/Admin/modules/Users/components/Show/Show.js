import React from 'react'
import log from 'loglevel'
import moment from 'moment'
import reactBootstrap from 'react-bootstrap'
import find from 'prelude-ls'

import createElement from '../../../../../../../library/create-element'

const button = createElement(reactBootstrap.Button)
const buttonToolbar = createElement(reactBootstrap.ButtonToolbar)
const glyphicon = createElement(reactBootstrap.Glyphicon)
const col = createElement(reactBootstrap.Col)
const grid = createElement(reactBootstrap.Grid)
const h1 = createElement('h1')
const h5 = createElement('h5')
const loader = createElement(require('react-loader'))
const pre = createElement('pre')
const row = createElement(reactBootstrap.Row)
const strong = createElement('strong')
const table = createElement(reactBootstrap.Table)
const tbody = createElement('tbody')
const td = createElement('td')
const thead = createElement('thead')
const tr = createElement('tr')

export default class Show extends React.Component {
  componentWillMount() {
    token = this.props.session.token
    email = this.props.params.email
    log.debug('modules/admin/modules/users/components/list/Show#component-will-mount', token, email)
    return this.props.handleShow(token, email)
  }

  renderLoading() {
    return loader({
      loaded: false,
      color: '#000000'
    })
  }

  renderToolbar() {
    var this$ = this
    return row(undefined, col({
      xs: 12
    }, buttonToolbar({
      style: {
        marginBottom: 10
      }
    }, button({
      onClick: () => {
        this$.props.navigateToList()
      },
      bsStyle: 'primary'
    }, glyphicon({
      glyph: 'chevron-left'
    })), button({
      onClick: () => {
        this$.props.navigateToEdit(user.email)
      },
      bsStyle: 'success'
    }, glyphicon({
      glyph: 'pencil'
    })))))
  }

  renderTable() {
    return row(undefined, col({
      xs: 12
    }, table({
      bordered: true,
      striped: true,
      hover: true
    }, thead(undefined), tbody(undefined, tr(undefined, td(undefined, strong(undefined, 'ID')), td(undefined, user.id)), tr(undefined, td(undefined, strong(undefined, 'Username')), td(undefined, user.username)), tr(undefined, td(undefined, strong(undefined, 'Email')), td(undefined, user.email)), tr(undefined, td(undefined, strong(undefined, 'Email Verified')), td(undefined, user.emailVerified ? 'Yes' : 'No')), tr(undefined, td(undefined, strong(undefined, 'Status')), td(undefined, user.status)), tr(undefined, td(undefined, strong(undefined, 'Created')), td(undefined, moment(user.created).format('YYYY/MM/DD HH:mm:ss'))), tr(undefined, td(undefined, strong(undefined, 'Updated')), td(undefined, moment(user.lastUpdated).format('YYYY/MM/DD HH:mm:ss')))))))
  }

  render() {
    var email, users, user, this$ = this
    log.debug('modules/main/modules/users/components/Show#render', this.props)
    email = this.props.params.email
    users = this.props.users
    user = find((it) => {
      return it.email === email
    })(
      users)
    if (!user) {
      return this.renderLoading()
    } else {
      return grid(undefined, this.renderToolbar(user), this.renderTable(user))
    }
  }
}
