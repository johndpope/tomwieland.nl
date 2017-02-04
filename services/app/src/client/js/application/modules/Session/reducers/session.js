import I from 'seamless-immutable'
import { handleActions } from 'redux-actions'

const defaultState = I({
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggedOut: true,
  token: null,
  ttl: null,
  created: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
})

export default handleActions({
  'Session:Login:Start': (state, action) => {
    return state
      .merge({
        isLoggingIn: true,
        isLoggedIn: false,
        isLoggedOut: true,
        token: null,
        ttl: null,
        created: null,
        user: {
          id: null,
          username: null,
          email: null,
        },
      })
  },

  'Session:Login:Success': (state, action) => {
    return state
      .merge({
        isLoggingIn: false,
        isLoggedIn: true,
        isLoggedOut: false,
        token: action.payload.id,
        ttl: action.payload.id,
        created: action.payload.id,
        user: {
          id: action.payload.user.id,
          username: action.payload.user.username,
          email: action.payload.user.email,
        },
      })
  },

  'Session:Login:Failure': (state, action) => {
    return state
      .merge({
        isLoggingIn: false,
        isLoggedIn: false,
        isLoggedOut: true,
        token: null,
        ttl: null,
        created: null,
        user: {
          id: null,
          username: null,
          email: null,
        },
      })
  },

  'Session:Logout:Start': (state, action) => {
    return state
      .merge({
        isLoggingOut: true,
        isLoggedIn: true,
        isLoggedOut: false,
        token: null,
        ttl: null,
        created: null,
        user: {
          id: null,
          username: null,
          email: null,
        },
      })
  },

  'Session:Logout:Success': (state, action) => {
    return state
      .merge({
        isLoggingOut: false,
        isLoggedIn: false,
        isLoggedOut: true,
        token: null,
        ttl: null,
        created: null,
        user: {
          id: null,
          username: null,
          email: null,
        },
      })
  },

  'Session:Logout:Failure': (state, action) => {
    return state
      .merge({
        isLoggingOut: false,
        isLoggedIn: true,
        isLoggedOut: false,
        token: null,
        ttl: null,
        created: null,
        user: {
          id: null,
          username: null,
          email: null,
        },
      })
  },

  'Session:GetCookie:Start': (state, action) => {
    return state
      .merge({
        isLoggingIn: true,
        isLoggedIn: false,
        isLoggedOut: true,
      })
  },

  'Session:GetCookie:Success': (state, action) => {
    return state
      .merge({
        isLoggingIn: false,
        isLoggedIn: false,
        isLoggedOut: true,
        created: action.payload.created,
        token: action.payload.token,
        ttl: action.payload.ttl,
        userId: action.payload.userId,
      })
  },

  'Session:GetCookie:Failure': (state, action) => {
    return state
      .merge({
        isLoggingIn: false,
        isLoggedIn: false,
        isLoggedOut: true,
      })
  },

  'Session:SetCookie:Success': (state, action) => {
    return state
      .merge({
        isLoggingIn: false,
        isLoggedIn: true,
        isLoggedOut: false,
        created: action.payload.created,
        token: action.payload.token,
        ttl: action.payload.ttl,
        userId: action.payload.userId,
      })
  },
}, defaultState)
