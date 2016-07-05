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

        el 'td', void,
          v.username

        el 'td', void,
          v.email

  render-pagination: ->
    false

  render: ->
    { is-fetching } = @props.list

    if is-fetching
      el Loader,
        loaded: not is-fetching
        color: \#000000

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
