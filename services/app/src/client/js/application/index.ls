reducers = require \./reducers
routes   = require \./routes

admin   = require \./modules/admin
main    = require \./modules/main
session = require \./modules/session

application =
  name: \Application
  reducers: reducers
  routes: routes
  modules: [
    admin
    main
    session
  ]

module.exports = application
