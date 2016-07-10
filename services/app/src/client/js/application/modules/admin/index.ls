routes = require \./routes

users = require \./modules/users

module.exports =
  name: \Admin
  routes: routes
  modules: [ users ]
