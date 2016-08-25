log        = require \loglevel
redux-crud = require \redux-crud


action-types = redux-crud.action-types-for \users

log.debug \ACTIONTYPES, action-types

module.exports = action-types
