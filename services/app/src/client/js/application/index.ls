reducers = require \./reducers
routes   = require \./routes

#admin   = require \./modules/admin
main    = require \./modules/main
session = require \./modules/session

module.exports =
  name: \Application
  reducers: reducers
  routes: routes
  modules: [
    #admin
    main
    session
  ]
