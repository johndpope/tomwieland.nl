module.exports = (app, cb) ->
  rest-api-root = app.get \restApiRoot

  app.use rest-api-root, app.loopback.rest!

  cb!
