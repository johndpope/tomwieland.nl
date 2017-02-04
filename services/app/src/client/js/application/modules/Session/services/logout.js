import hl from 'highland'
import { createAction } from 'redux-actions'

// import clearCookieService from './clear-cookie'

const logoutStart = createAction('user:logout:start')
const logoutSuccess = createAction('user:logout:success')
const logoutFailure = createAction('user:logout:failure')

export default (token) => {
  const output = hl()
  const uri = `${window.location.origin}/api/users/logout`
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  output.write(logoutStart())

  hl(fetch(uri, options))
    .toCallback((error, body) => {
      if (error) {
        output.write(logoutFailure(error))
      } else {
        output.write(logoutSuccess())

        // clearCookieService()
        //   .each(output.write.bind(output))
      }
    })

  return output
}
