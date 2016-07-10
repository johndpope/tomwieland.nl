Loader = require \react-loader
React  = require \react
el     = React~create-element
log    = require \loglevel

{
  Button
  Button-group
  Col
  Glyphicon
  Grid
  Row
  Table
} = require \react-bootstrap

class List extends React.Component
  component-will-mount: ->
    { token } = @props.session

    log.debug \modules/admin/modules/users/components/list/List#component-will-mount, token

    @props.handle-list token

  handle-row-click: (id, event) ->
    log.debug \modules/admin/modules/users/components/list/List#handle-row-click

    event.prevent-default!

    @props.navigate-to-show id

  render-rows: ->
    log.debug \modules/admin/modules/users/components/list/List#render-rows

    { entries } = @props.list

    entries.map (v) ->
      el 'tr',
        on-click: @handle-row-click.bind this, v.id,

        el 'td', void,
          v.username

        el 'td', void,
          v.email

  render-pagination: ->
    log.debug \modules/admin/modules/users/components/list/List#render-pagination

    false

  render: ->
    log.debug \modules/admin/modules/users/components/list/List#render

    { is-fetching } = @props.list

    if is-fetching
      el Loader,
        loaded: not is-fetching
        color: \#000000
    else
      el Grid, void,
        el Row, void,
          el Col,
            xs: 12,

            el Table,
              border: true
              striped: true
              condensed: true
              hover: true,

              el 'thead', void,
                el 'tr', void,
                  el 'th', void,
                    'Username'

                  el 'th', void,
                    'Email'

              el 'tbody', void,
                @render-rows!

              el 'tfoot', void,
                @render-pagination!

module.exports = List
