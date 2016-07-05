morgan = require \morgan

module.exports = (app, cb) ->
  app.use morgan \dev

  cb!
