import React from 'react'
import createElement from '../../../../../../../library/create-element'
import log from 'loglevel'
import moment from 'moment'
import reactBootstrap from 'react-bootstrap'
import reduxForm from 'redux-form'
import find from 'prelude-ls'

const div = createElement('div')
const pre = createElement('pre')
const form = createElement('form')
const input = createElement('input')
const label = createElement('label')
const button = createElement(reactBootstrap.Button)
const buttonToolbar = createElement(reactBootstrap.ButtonToolbar)
const checkbox = createElement(reactBootstrap.Checkbox)
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

const fieldGroup = (id, label, help, props) => {
  return formGroup({
    controlId: id
  }, controlLabel(undefined, label), formControl(props), formControlFeedback(undefined), help && helpBlock(undefined, help))
}

const textField = (id, label, help, defaultValue, props) => {
  label == null && (label = '')
  help == null && (help = '')
  props == null && (props = {})
  props.type = 'text'
  props.defaultValue = defaultValue
  return fieldGroup(id, label, help, props)
}

const emailField = (id, label, help, defaultValue, props) => {
  label == null && (label = '')
  help == null && (help = '')
  props == null && (props = {})
  props.type = 'email'
  props.defaultValue = defaultValue
  return fieldGroup(id, label, help, props)
}

const checkboxField = (id, label, help, defaultValue, props) => {
  label == null && (label = '')
  help == null && (help = '')
  props == null && (props = {})
  props.checked = defaultValue
  return formGroup({
    controlId: id
  }, controlLabel(undefined, label), checkbox(props, defaultValue && "Yes" || "No"), formControlFeedback(undefined), helpBlock(undefined, help))
}

class Form extends React.Component {
  render() {
    ref$ = this.props, fields = ref$.fields, id = fields.id, username = fields.username, email = fields.email, emailVerified = fields.emailVerified, status = fields.status, created = fields.created, lastUpdated = fields.lastUpdated, dummy = fields.dummy, submit = ref$.submit, handleSubmit = ref$.handleSubmit
    id.disabled = true
    username.type = 'text'
    username.className = 'form-control'
    username.id = 'username'
    return form({
      onSubmit: submit
    }, textField('id', "ID", undefined, undefined, id), textField('username', "Username", undefined, undefined, username), emailField('email', "Email", undefined, undefined, email), checkboxField('email-verified', "Email Verified", undefined, undefined, emailVerified), textField('status', "Status", undefined, undefined, status), textField('created', "Created", undefined, undefined, created), textField('last-updated', "Last Updated", undefined, undefined, lastUpdated), buttonToolbar(undefined, button({
      type: 'submit',
      bsStyle: 'success'
    }, glyphicon({
      glyph: 'ok',
      style: {
        marginRight: 10
      }
    }), "Save")))
  }
}

export default reduxForm({
  form: 'admin-users-user',
  fields: ['id', 'username', 'email', 'email-verified', 'status', 'created', 'last-updated'],
}, (state) => {
  const user = state.Application.Admin.Users.users[0]

  return {
    initialValues: user,
  }
})(Form)
