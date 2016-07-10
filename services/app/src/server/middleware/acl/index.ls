async = require \async

#rolemappings = require \./rolemappings
#roles        = require \./roles
#users        = require \./users

admin        = require \./admin

module.exports = (app, cb) ->
  async.series [
    (cb) -> admin app, cb
    #(cb) -> roles app, cb
    #(cb) -> users app, cb
    #(cb) -> rolemappings app, cb
  ], cb
