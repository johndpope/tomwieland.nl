async = require \async

admin      = require \./admin
author     = require \./author
dummy      = require \./dummy
editor     = require \./editor
manager    = require \./manager
member     = require \./member
moderator  = require \./moderator
subscriber = require \./subscriber
user       = require \./user

module.exports = (app, cb) ->
  async.parallel [
    (cb) -> admin app, cb
    (cb) -> author app, cb
    (cb) -> dummy app, cb
    (cb) -> editor app, cb
    (cb) -> manager app, cb
    (cb) -> member app, cb
    (cb) -> moderator app, cb
    (cb) -> subscriber app, cb
    (cb) -> user app, cb
  ], cb
