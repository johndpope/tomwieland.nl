redux-crud           = require \redux-crud
seamless-immutable   = require \seamless-immutable
{ combine-reducers } = require \redux

crud-users-reducer = redux-crud.reducers-for \users

module.exports =
  users: crud-users-reducer
