React           = require \react
create-element  = require \../../../../../../../library/create-element
el              = React~create-element
log             = require \loglevel
react-bootstrap = require \react-bootstrap
{ map }         = require \prelude-ls

button         = create-element react-bootstrap.Button
button-toolbar = create-element react-bootstrap.ButtonToolbar
col            = create-element react-bootstrap.Col
div            = create-element \div
form           = create-element react-bootstrap.Form
form-control   = create-element react-bootstrap.FormControl
form-group     = create-element react-bootstrap.FormGroup
glyphicon      = create-element react-bootstrap.Glyphicon
grid           = create-element react-bootstrap.Grid
loader         = create-element require \react-loader
row            = create-element react-bootstrap.Row
table          = create-element react-bootstrap.Table
tbody          = create-element \tbody
td             = create-element \td
tfoot          = create-element \tfoot
th             = create-element \th
thead          = create-element \thead
tr             = create-element \tr

class List extends React.Component
  component-will-mount: ->
    { token } = @props.session

    log.debug \modules/admin/modules/users/components/list/List#component-will-mount, token

    @props.handle-list token

  handle-row-click: (email, event) -->
    log.debug \modules/admin/modules/users/components/list/List#handle-row-click, email, event

    event.prevent-default!

    @props.navigate-to-show email

  render-rows: ->
    log.debug \modules/admin/modules/users/components/list/List#render-rows

    { users } = @props

    map ~>
      { username, email } = it

      tr void,
        td void, username
        td void, email
        td void,
          button-toolbar void,
            button do
              bs-style: \primary,
              on-click: !~> @props.navigate-to-show email,

              glyphicon glyph: \eye-open

            button do
              bs-style: \success
              on-click: !~> @props.navigate-to-edit email,

              glyphicon glyph: \pencil

            button do
              bs-style: \danger
              on-click: !~> @props.show-delete-modal email,

              glyphicon glyph: \trash
    , users

  render-pagination: ->
    log.debug \modules/admin/modules/users/components/list/List#render-pagination

    false

  render-table: ->
    div void,
      row void,
        col xs: 12,
          table bordered: true, striped: true, hover: true,
            thead void,
              tr void,
                th void, 'Username'
                th void, 'Email'
                th void, ''
            tbody void, @render-rows!
      row void,
        col xs: 12,
          @render-pagination!

  render-loading: ->
    loader do
      loaded: false
      color: \#000000

  render: ->
    log.debug \modules/admin/modules/users/components/list/List#render

    { users } = @props

    if users.length is 0
      @render-loading!
    else
      grid void,
        @render-table!

module.exports = List
