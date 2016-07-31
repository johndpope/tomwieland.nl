{ UserAuthWrapper } = require \redux-auth-wrapper
{ router-actions }  = require \react-router-redux

module.exports = UserAuthWrapper do
  wrapper-display-name: \UserIsAuthenticated
  redirect-action:      router-actions.replace
  auth-selector: (state) ->
    state?.Application?.Session?.profile?.id
