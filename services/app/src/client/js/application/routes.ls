React = require \react
el = React~create-element
{ Provider } = require \react-redux
{ Router, hash-history } = require \react-router

module.exports = (context) ->
  el Provider, { store: context.store, key: context.key },
    el Router, { history: hash-history },
      context.routes
