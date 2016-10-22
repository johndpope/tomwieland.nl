import hl from 'highland'
import log from 'loglevel'
import { createAction } from 'redux-actions'

import setCookieService from './set-cookie'

const loginStart = createAction('user:login:start')
const loginSuccess = createAction('user:login:success')
const loginFailure = createAction('user:login:failure')

// const User = global.loopbackApplication.models.User

const handleLogin = (output) => {
  return (error, result) => {
    if (error) {
      output.write(loginFailure(error))
      return
    }

    result.token = result.id

    delete result.id

    output.write(loginSuccess(result))

    setCookieService(result)
      .each(output.write.bind(output))
      .done(() => {
        output.write(push('/admin'))
      })
  }
}

export default (email, password) => {
  const output = hl()

  output.write(loginStart())

  // TODO: Reimplement.
  /*
  User.login({
    email,
    password,
  }, handleLogin(output))
  */

  return output
}
