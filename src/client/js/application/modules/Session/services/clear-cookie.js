import cookies from 'cookies-js'
import hl from 'highland'
import { createAction } from 'redux-actions'

const clearCookieStart = createAction('user:clear-cookie:start')
const clearCookieSuccess = createAction('user:clear-cookie:success')
const clearCookieFailure = createAction('user:clear-cookie:failure')

export default () => {
  const output = hl()

  const cookiesOptions = {
    path: '/',
    domain: window.location.hostname,
  }

  output.write(clearCookieStart())

  cookies.expire('created', cookiesOptions)
  cookies.expire('token', cookiesOptions)
  cookies.expire('ttl', cookiesOptions)
  cookies.expire('user-id', cookiesOptions)

  output.write(clearCookieSuccess())

  return output
}
