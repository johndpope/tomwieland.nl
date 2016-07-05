React = require \react
el = React~create-element

module.exports = (context) ->
  el \div, null, context.children
