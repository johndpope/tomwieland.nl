React           = require \react
create-element  = require \../../../../../../../library/create-element
log             = require \loglevel
moment          = require \moment
react-bootstrap = require \react-bootstrap
{ find }        = require \prelude-ls

button       = create-element react-bootstrap.Button
button-toolbar = create-element react-bootstrap.ButtonToolbar
glyphicon = create-element react-bootstrap.Glyphicon
col          = create-element react-bootstrap.Col
grid         = create-element react-bootstrap.Grid
h1           = create-element \h1
h5           = create-element \h5
loader       = create-element require \react-loader
pre          = create-element \pre
row          = create-element react-bootstrap.Row
strong       = create-element \strong
table        = create-element react-bootstrap.Table
tbody        = create-element \tbody
td           = create-element \td
thead        = create-element \thead
tr           = create-element \tr

class Show extends React.Component
  component-will-mount: ->
    { token } = @props.session
    { email } = @props.params

    log.debug \modules/admin/modules/users/components/list/Show#component-will-mount, token, email

    @props.handle-show token, email

  render-loading: ->
    loader do
      loaded: false
      color: \#000000

  render-toolbar: (user) ->
    row void,
      col xs: 12,
        button-toolbar style: margin-bottom: 10,
          button do
            on-click: @props.navigate-to-list
            bs-style: \primary,

            glyphicon glyph: \chevron-left

          button do
            on-click: !-> @props.navigate-to-edit email
            bs-style: \success,

            glyphicon glyph: \pencil

  render-table: (user) ->
    row void,
      col xs: 12,

        table bordered: true, striped: true, hover: true,
          thead void
          tbody void,
            tr void,
              td void, strong void, 'ID'
              td void, user.id
            tr void,
              td void, strong void, 'Username'
              td void, user.username
            tr void,
              td void, strong void, 'Email'
              td void, user.email
            tr void,
              td void, strong void, 'Email Verified'
              td void, if user.email-verified then 'Yes' else 'No'
            tr void,
              td void, strong void, 'Status'
              td void, user.status
            tr void,
              td void, strong void, 'Created'
              td void, (moment user.created).format 'YYYY/MM/DD HH:mm:ss'
            tr void,
              td void, strong void, 'Updated'
              td void, (moment user.lastUpdated).format 'YYYY/MM/DD HH:mm:ss'

  render: ->
    log.debug \modules/main/modules/users/components/Show#render, @props

    { email } = @props.params
    { users } = @props

    user = users
      |> find (.email is email)

    if not user
      @render-loading!
    else
      grid void,
        @render-toolbar user
        @render-table user

module.exports = Show
