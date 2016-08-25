hl         = require \highland
immutable  = require \seamless-immutable
log        = require \loglevel
redux-crud = require \redux-crud
uuid       = require \uuid

fetch-api = require \../../../../../library/fetch-api

standard-actions = redux-crud.action-creators-for \users

actions = Object.assign {}, standard-actions,
  create: ->
    debugger

  delete: ->
    debugger

  fetch-one: (record, token, email) ->
    log.debug \modules/admin/modules/users/services/fetch-one, token, email

    filter = JSON.stringify do
      where:
        email: email

    url = "#{window.location.origin}/api/users?filter=#{filter}"

    options =
      method: \GET
      headers:
        'Content-Type':  \application/json
        Accept:          \application/json
        Authorization:   token

    fetch-api url, options, standard-actions.fetch-start, standard-actions.fetch-success, standard-actions.fetch-error, record

  fetch: (records, token, skip, limit, order) ->
    log.debug \modules/admin/modules/users/services/fetch, token, skip, limit, order

    filter = JSON.stringify do
      skip:   skip
      limit:  limit
      order:  order

    url = "#{window.location.origin}/api/users?filter=#{filter}"

    options =
      method: \GET
      headers:
        'Content-Type':  \application/json
        Accept:          \application/json
        Authorization:   token

    fetch-api url, options, standard-actions.fetch-start, standard-actions.fetch-success, standard-actions.fetch-error, records

  update: (record, token, data) ->
    log.debug \modules/admin/modules/users/services/update, token, data

    url  = "#{window.location.origin}/api/users/#{data.id}"
    body = JSON.stringify Object.assign {}, data

    delete body.id

    options =
      method: \PUT
      headers:
        'Content-Type':  \application/json
        Accept:          \application/json
        Authorization:   token
      body: body

    fetch-api url, options, standard-actions.update-start, standard-actions.update-success, standard-actions.update-error, record

module.exports = actions
