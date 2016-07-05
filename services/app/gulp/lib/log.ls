{ Transform } = require \stream
gulp-util     = require \gulp-util

class FileLogger extends Transform
  (options) ->
    options.object-mode = true

    super options

    @task-name = options.task-name

  _transform: (object, encoding, cb) ->
    file-name = object.history.0
      .replace object.base, ''

    gulp-util.log @task-name, file-name

    cb null, object, encoding

exports.file = (task-name) ->
  new FileLogger do
    task-name: task-name
