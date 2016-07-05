React = require \react
Loader = require \react-loader
{
  Button
  Button-group
  Col
  Glyphicon
  Grid
  Row
  Table
} = require \react-bootstrap
el = React~create-element

class List extends React.Component
  component-will-mount: ->
    { token } = @props.session

    @props.handle-list token

  handle-row-click: (id, event) ->
    event.prevent-default!

    @props.navigate-to-show id

  render-rows: ->
    { entries } = @props.list

    entries.map (v) ->
      el 'tr',
        on-click: @handle-row-click.bind this, v.id,

        el 'td', null,
          v.username

        el 'td', null,
          v.email

  render-pagination: ->
    false

  render: ->
    { is-fetching } = @props.list

    if is-fetching
      el Loader,
        loaded: not is-fetching
        color: \#000000

    el Grid, null,
      el Row, null,
        el Col,
          xs: 12,

          el Table,
            border: true
            striped: true
            condensed: true
            hover: true,

            el 'thead', null,
              el 'tr', null,
                el 'th', null,
                  'Username'

                el 'th', null,
                  'Email'

            el 'tbody', null,
              @render-rows!

            el 'tfoot', null,
              @render-pagination!

module.exports = List
