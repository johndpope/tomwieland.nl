hl         = require \highland
log        = require \loglevel
redux-crud = require \redux-crud
uuid       = require \uuid

standard-actions = redux-crud.action-creators-for \users

actions = Object.assign {}, standard-actions,
  create: ->
    debugger

  delete: ->
    debugger

  fetch-one: (token, email) ->
    log.debug \modules/admin/modules/users/services/fetch-one, token, email

    output = hl!
    output.write actions.fetch-start!

    filter = JSON.stringify do
      where:
        email: email

    url = "#{window.location.origin}/api/users?filter=#{filter}"

    options =
      method: \GET
      headers:
        'Content-Type': \application/json
        Accept: \application/json
        Authorization: token

    fetch url, options
      .then (.json!)
      .then (json) ->
        log.debug \modules/admin/modules/users/services/fetch-one:then, json

        output.write actions.fetch-success json[0]
        output.end!

      .catch (error) ->
        log.debug \modules/admin/modules/users/services/fetch-one:error, error

        output.write actions.fetch-error error
        output.end!

    output

  fetch: (token, skip, limit, order) ->
    log.debug \modules/admin/modules/users/services/fetch, token, skip, limit, order

    output = hl!
    output.write actions.fetch-start!

    filter = JSON.stringify do
      skip:   skip
      limit:  limit
      order:  order

    url = "#{window.location.origin}/api/users?filter=#{filter}"

    options =
      method: \GET
      headers:
        'Content-Type': \application/json
        Accept: \application/json
        Authorization: token

    fetch url, options
      .then (.json!)
      .then (json) ->
        log.debug \modules/admin/modules/users/services/fetch:then, json

        output.write actions.fetch-success json
        output.end!

      .catch (error) ->
        log.debug \modules/admin/modules/users/services/fetch:error, error

        output.write actions.fetch-error error
        output.end!

    output

  update: ->
    debugger

module.exports = actions
