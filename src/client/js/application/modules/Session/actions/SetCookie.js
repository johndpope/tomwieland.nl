import cookies from 'cookies-js'
import { createAction } from 'redux-actions'

export default createAction('Session:SetCookie', ({ created, token, ttl, user }) => {
  const cookiesOptions = {
    path: '/',
    domain: window.location.hostname,
    expires: new Date(new Date().valueOf() + ttl),
    secure: false,
  }

  cookies.set('created', created, cookiesOptions)
  cookies.set('token', token, cookiesOptions)
  cookies.set('ttl', ttl, cookiesOptions)
  cookies.set('userId', user.id, cookiesOptions)
  cookies.set('userEmail', user.email, cookiesOptions)

  return {
    created,
    token,
    ttl,
    userId: user.id,
    userEmail: user.email,
  }
})
