React = require \react
{
  Col
  Grid
  Row
} = require \react-bootstrap
el = React~create-element

module.exports = (context) ->
  el Grid, null,
    el Row, null,
      el Col,
        xs: 12,

        'Add!'

