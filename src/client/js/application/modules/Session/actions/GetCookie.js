import cookies from 'cookies-js'
import { createAction } from 'redux-actions'

export default createAction('Session:GetCookie', () => {
  return {
    created: cookies.get('created'),
    token: cookies.get('token'),
    ttl: cookies.get('ttl'),
    userId: cookies.get('userId'),
  }
})
