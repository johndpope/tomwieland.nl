import React from 'react'
import log from 'loglevel'
import moment from 'moment'
import reactBootstrap from 'react-bootstrap'
import reduxForm from 'redux-form'
import find from 'prelude-ls'

import createElement from '../../../../../../../library/create-element'

const userForm = createElement(require('../partials/Form'))
const h1 = createElement('h1')
const h5 = createElement('h5')
const pre = createElement('pre')
const strong = createElement('strong')
const tbody = createElement('tbody')
const td = createElement('td')
const thead = createElement('thead')
const tr = createElement('tr')
const input = createElement('input')
const label = createElement('label')
const button = createElement(reactBootstrap.Button)
const buttonToolbar = createElement(reactBootstrap.ButtonToolbar)
const col = createElement(reactBootstrap.Col)
const controlLabel = createElement(reactBootstrap.ControlLabel)
const formControl = createElement(reactBootstrap.FormControl)
const formControlFeedback = createElement(reactBootstrap.FormControl.Feedback)
const formGroup = createElement(reactBootstrap.FormGroup)
const glyphicon = createElement(reactBootstrap.Glyphicon)
const grid = createElement(reactBootstrap.Grid)
const helpBlock = createElement(reactBootstrap.HelpBlock)
const loader = createElement(require('react-loader'))
const row = createElement(reactBootstrap.Row)
const table = createElement(reactBootstrap.Table)

export default class Edit extends React.Component {
  componentWillMount() {
    token = this.props.session.token
    email = this.props.params.email
    log.debug('modules/admin/modules/users/components/Edit#component-will-mount', token, email)
    return this.props.handleEdit(token, email)
  }

  renderLoading() {
    log.debug('modules/main/modules/users/components/Edit#render-loading')
    return loader({
      loaded: false,
      color: '#000000'
    })
  }

  renderToolbar() {
    log.debug('modules/main/modules/users/components/Edit#render-toolbar')
    const email = user.email

    return row(undefined, col({
      xs: 12
    }, buttonToolbar({
      style: {
        marginBottom: 10
      }
    }, button({
      onClick: () => {
        this$.props.navigateToShow(email)
      },
      bsStyle: 'primary'
    }, glyphicon({
      glyph: 'eye-open'
    })), button({
      onClick: () => {
        this$.props.navigateToEdit(email)
      },
      bsStyle: 'danger'
    }, glyphicon({
      glyph: 'trash'
    })))))
  }

  getValidationState() {
    log.debug('modules/main/modules/users/components/Edit#get-validation-state')
    return false
  }

  renderForm() {
    const options = user.asMutable()
    options.submit = this.props.handleSubmit.bind(null, this.props.session.token)

    return row(undefined, col({
      xs: 12
    }, userForm(options)))
  }

  render() {
    const user = find((it) => {
      return it.email === email
    }, users)

    if (!(user != null && ((ref$ = user.id) != null && ref$.length))) {
      return this.renderLoading()
    } else {
      return grid(undefined, this.renderToolbar(user), this.renderForm(user))
    }
  }
}
