async = require \async

admin = require \./admin

module.exports = (app, cb) ->
  async.parallel [
    (cb) -> admin app, cb
  ], cb
