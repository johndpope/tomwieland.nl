fs   = require \fs
path = require \path

module.exports = ->
  (req, res, next) ->
    res.send-file path.resolve "#{__dirname}/../../client/index.html"
