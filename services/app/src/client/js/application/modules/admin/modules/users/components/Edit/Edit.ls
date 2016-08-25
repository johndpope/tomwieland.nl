React           = require \react
log             = require \loglevel
moment          = require \moment
react-bootstrap = require \react-bootstrap
redux-form      = require \redux-form

create-element  = require \../../../../../../../library/create-element

{
  find
}        = require \prelude-ls

user-form = create-element require \../partials/Form

h1     = create-element \h1
h5     = create-element \h5
pre    = create-element \pre
strong = create-element \strong
tbody  = create-element \tbody
td     = create-element \td
thead  = create-element \thead
tr     = create-element \tr

input = create-element \input
label = create-element \label

button                = create-element react-bootstrap.Button
button-toolbar        = create-element react-bootstrap.ButtonToolbar
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

class Edit extends React.Component
  component-will-mount: ->
    { token } = @props.session
    { email } = @props.params

    log.debug \modules/admin/modules/users/components/Edit#component-will-mount, token, email

    debugger

    @props.handle-edit token, email

  render-loading: ->
    log.debug \modules/main/modules/users/components/Edit#render-loading

    loader do
      loaded: false
      color: \#000000

  render-toolbar: (user) ->
    log.debug \modules/main/modules/users/components/Edit#render-toolbar

    { email } = user

    row void,
      col xs: 12,
        button-toolbar style: margin-bottom: 10,
          button do
            on-click: !~> @props.navigate-to-show email,
            bs-style: \primary,

            glyphicon glyph: \eye-open

          button do
            on-click: !~> @props.navigate-to-edit email
            bs-style: \danger,

            glyphicon glyph: \trash

  get-validation-state: ->
    log.debug \modules/main/modules/users/components/Edit#get-validation-state

    false

  render-form: (user) ->
    log.debug \modules/main/modules/users/components/Edit#render-form

    options = user.as-mutable!

    # This can not be on-submit or handle-submit somehow..
    options.submit = @props.handle-submit.bind null, @props.session.token

    row void,
      col xs: 12,
        user-form options

  render: ->
    {
      { email }: params
      users
    } = @props

    user = find (.email is email), users

    log.debug \modules/main/modules/users/components/Edit#render, email, user

    if not user?.id?.length
      @render-loading!
    else
      grid void,
        @render-toolbar user
        @render-form user

module.exports = Edit
