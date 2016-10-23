import cookies from 'cookies-js'
import hl from 'highland'
import log from 'loglevel'
import { createAction } from 'redux-actions'
import getProfile from './get-profile'

const setCookieStart = createAction('user:set-cookie:start')
const setCookieSuccess = createAction('user:set-cookie:success')
const setCookieFailure = createAction('user:set-cookie:failure')

export default ({ created, token, ttl, userId }) => {
  const output = hl()

  const cookiesOptions = {
    path: '/',
    domain: window.location.hostname,
    expires: new Date(new Date().valueOf() + ttl),
    secure: false,
  }

  output.write(setCookieStart())

  cookies.set('created', created, cookiesOptions)
  cookies.set('token', token, cookiesOptions)
  cookies.set('ttl', ttl, cookiesOptions)
  cookies.set('user-id', userId, cookiesOptions)

  output.write(setCookieSuccess({
    created,
    token,
    ttl,
    userId,
  }))

  getProfile(token, userId)
    .each(output.write.bind(output))
    .done(() => {
      output.end()
    })

  return output
}
