async   = require \async
{ map } = require \prelude-ls

models = []

sync-local-with-remote-model = (local-model, remote-model, since, cb) ->
  debugger
  error, conflicts, cps <-! local-model.replicate remote-model, since.push
  debugger

  if error
    return cb error

  since.push = cps

  cb!

sync-remote-with-local-model = (remote-model, local-model, since, cb) ->
  debugger
  error, conflicts, cps <-! remote-model.replicate local-model, since.pull
  debugger

  if error
    return cb error

  since.pull = cps

  cb!

sync-one = (model) ->
  debugger

  (cb) !->
    debugger

    async.series [
      (cb) !->
        debugger

        sync-local-with-remote-model model.local-model, model.remote-model, model.since, cb

      (cb) !->
        debugger

        sync-remote-with-local-model model.remote-model, model.local-model, model.since, cb
    ], cb

sync-everything = (cb) !->
  debugger

  error, results <-! async.parallel map sync-one, models

  debugger

  if error
    return cb error

sync-model = (local-model, remote-model, since) ->
  debugger

  models.push do
    local-model:   local-model
    remote-model:  remote-model
    since:         since

  local-model.observe 'after save', (context, cb) !->
    debugger

    sync-everything cb

  remote-model.observe 'after save', (context, cb) !->
    debugger

    sync-everything cb

  local-model.observe 'access', (context, cb) !->
    debugger

    sync-everything cb

  remote-model.observe 'access', (context, cb) !->
    debugger

    sync-everything cb

module.exports = (app) ->
  {
    LocalUser
    RemoteUser

    LocalBlogPost
    RemoteBlogPost

    LocalBlogComment
    RemoteBlogComment
  } = app.models

  app.network =
    is-connected: true

  sync-model LocalUser, RemoteUser,
    push: -1
    pull: -1

  sync-model LocalBlogPost, RemoteBlogPost,
    push: -1
    pull: -1

  sync-model LocalBlogComment, RemoteBlogComment,
    push: -1
    pull: -1

  app.sync = sync-everything
