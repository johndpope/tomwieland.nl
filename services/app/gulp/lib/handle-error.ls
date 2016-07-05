gulp-util = require \gulp-util

module.exports = (task-name, error) ->
  error = error.stack or error.message or error

  gulp-util.log task-name, "Error: #{error}"
  #console.error error
