React                = require \react
{ combine-reducers } = require \redux
{ fold, Obj }        = require \prelude-ls
log                  = require \loglevel

el = React~create-element

is-object-empty = (o) -> (Obj.keys o).length is 0

exports.get-reducers = (module) ->
  log.debug 'module#get-reducers', module

  module-reducers = Object.assign {}, module.reducers

  for i, sub-module of module.modules
    sub-module-reducers = exports.get-reducers sub-module

    if sub-module-reducers
      module-reducers[sub-module.name] = sub-module-reducers

  if not is-object-empty module-reducers
    return combine-reducers module-reducers

exports.get-routes = (module, store) ->
  log.debug 'module#get-routes', module, store

  module-routes     = module.routes
  sub-module-routes = []

  for i, v of module.modules
    routes = exports.get-routes v
    element = el \div,
      key: i,
      routes

    sub-module-routes.push element

  return module-routes do
    routes: sub-module-routes
    store: store
