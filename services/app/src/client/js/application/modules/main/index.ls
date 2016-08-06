reducers = require \./reducers
routes   = require \./routes

blog = require \./modules/blog

module.exports =
  name: \Main
  reducers: reducers
  routes: routes
  modules: [ blog ]
