React = require \react
el = React~create-element

module.exports = (context) ->
  el \div, void, context.children
