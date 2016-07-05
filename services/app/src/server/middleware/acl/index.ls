async = require \async

rolemappings = require \./rolemappings
roles        = require \./roles
users        = require \./users

module.exports = (app, cb) ->
  async.series [
    (cb) -> roles app, cb
    (cb) -> users app, cb
    (cb) -> rolemappings app, cb
  ], cb
