
import reduxCrud from 'redux-crud'
import seamlessImmutable from 'seamless-immutable'
import combineReducers from 'redux'
crudUsersReducer = reduxCrud.reducersFor('users')
export default {
  users: crudUsersReducer
}
