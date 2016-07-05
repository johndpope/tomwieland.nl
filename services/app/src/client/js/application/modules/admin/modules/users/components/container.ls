React = require \react
el = React~create-element

module.exports = (context) ->
  el div, void,
    el div,
      style:
        margin-top: \21px,

      context.children
