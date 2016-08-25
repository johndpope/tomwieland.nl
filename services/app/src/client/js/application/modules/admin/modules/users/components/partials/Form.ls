React           = require \react
create-element  = require \../../../../../../../library/create-element
log             = require \loglevel
moment          = require \moment
react-bootstrap = require \react-bootstrap

{
  redux-form
} = require \redux-form

{
  find
} = require \prelude-ls

div   = create-element \div
pre   = create-element \pre
form  = create-element \form
input = create-element \input
label = create-element \label

button                = create-element react-bootstrap.Button
button-toolbar        = create-element react-bootstrap.ButtonToolbar
checkbox              = create-element react-bootstrap.Checkbox
col                   = create-element react-bootstrap.Col
control-label         = create-element react-bootstrap.ControlLabel
form-control          = create-element react-bootstrap.FormControl
form-control-feedback = create-element react-bootstrap.FormControl.Feedback
form-group            = create-element react-bootstrap.FormGroup
glyphicon             = create-element react-bootstrap.Glyphicon
grid                  = create-element react-bootstrap.Grid
help-block            = create-element react-bootstrap.HelpBlock
loader                = create-element require \react-loader
row                   = create-element react-bootstrap.Row
table                 = create-element react-bootstrap.Table


field-group = (id, label, help, props) ->
  form-group control-id: id,
    control-label void, label
    form-control props
    form-control-feedback void
    help and help-block void, help

text-field = (id, label = '', help = '', default-value, props = {}) ->
  props.type          = \text
  props.default-value = default-value
  field-group id, label, help, props

email-field = (id, label = '', help = '', default-value, props = {}) ->
  props.type          = \email
  props.default-value = default-value
  field-group id, label, help, props

checkbox-field = (id, label = '', help = '', default-value, props = {}) ->
  props.checked = default-value

  form-group control-id: id,
    control-label void, label
    checkbox props,
      default-value and "Yes" or "No"
    form-control-feedback void
    help-block void, help

class Form extends React.Component
  render: ->
    log.debug \modules/main/modules/users/components/partials/Form#render

    {
      {
        id
        username
        email
        email-verified
        status
        created
        last-updated
        dummy
      }: fields
      submit
      handle-submit
    } = @props

    id.disabled = true

    username.type = \text
    username.class-name = \form-control
    username.id = \username

    form on-submit: submit,
      text-field     \id,              "ID",              void,  void, id
      text-field     \username,        "Username",        void,  void, username

      #div class: \form-group,
      #  label for: \username, "Username"
      #  input username

      email-field    \email,           "Email",           void,  void, email
      checkbox-field \email-verified,  "Email Verified",  void,  void, email-verified
      text-field     \status,          "Status",          void,  void, status
      text-field     \created,         "Created",         void,  void, created
      text-field     \last-updated,    "Last Updated",    void,  void, last-updated

      button-toolbar void,
        button type: \submit bs-style: \success,
          glyphicon glyph: \ok, style: margin-right: 10
          "Save"

module.exports = (redux-form {
  form: \admin-users-user,
  fields: [
    \id
    \username
    \email
    \email-verified
    \status
    \created
    \last-updated
  ]
},
  (state) ->
    # TODO: How do I find the correct user in the list of users without an email/id/etc?
    user = state.Application.Admin.Users.users.0

    initial-values: user
) Form
