import hl from 'highland'
import immutable from 'seamless-immutable'
import log from 'loglevel'
import reduxCrud from 'redux-crud'
import uuid from 'uuid'
import fetchApi from '../../../../../library/fetch-api'
standardActions = reduxCrud.actionCreatorsFor('users')
actions = Object.assign({}, standardActions, {
  create: () => {
  },
  'delete': () => {
  },
  fetchOne: (record, token, email) => {

    filter = JSON.stringify({
      where: {
        email: email
      }
    })
    url = window.location.origin + "/api/users?filter=" + filter
    options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      }
    }
    return fetchApi(url, options, standardActions.fetchStart, standardActions.fetchSuccess, standardActions.fetchError, record)
  },
  fetch: (records, token, skip, limit, order) => {

    filter = JSON.stringify({
      skip: skip,
      limit: limit,
      order: order
    })
    url = window.location.origin + "/api/users?filter=" + filter
    options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      }
    }
    return fetchApi(url, options, standardActions.fetchStart, standardActions.fetchSuccess, standardActions.fetchError, records)
  },
  update: (record, token, data) => {

    url = window.location.origin + "/api/users/" + data.id
    body = JSON.stringify(Object.assign({}, data))
    delete body.id
    options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      body: body
    }
    return fetchApi(url, options, standardActions.updateStart, standardActions.updateSuccess, standardActions.updateError, record)
  }
})
export default actions
