routes = require \./routes

blog = require \./modules/blog

module.exports =
  name: \Main
  routes: routes
  modules: [ blog ]
