import log from 'loglevel'
import reduxCrud from 'redux-crud'

actionTypes = reduxCrud.actionTypesFor('users')
log.debug('ACTIONTYPES', actionTypes)
export default actionTypes
