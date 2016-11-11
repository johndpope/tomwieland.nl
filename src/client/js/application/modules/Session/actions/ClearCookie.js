import cookies from 'cookies-js'
import { createAction } from 'redux-actions'

export default createAction('Session:ClearCookie', () => {
  const cookiesOptions = {
    path: '/',
    domain: window.location.hostname,
  }

  cookies.expire('created', cookiesOptions)
  cookies.expire('token', cookiesOptions)
  cookies.expire('ttl', cookiesOptions)
  cookies.expire('user-id', cookiesOptions)

  return true
})
