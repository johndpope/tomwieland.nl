React = require \react
{
  Col
  Grid
  Row
} = require \react-bootstrap
el = React~create-element

module.exports = (context) ->
  el Grid, void,
    el Row, void,
      el Col,
        xs: 12,

        'Show!'
