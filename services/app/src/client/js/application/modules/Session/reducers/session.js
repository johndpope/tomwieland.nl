import I from 'seamless-immutable'
import { handleActions } from 'redux-actions'

const defaultState = I({
  isLoggingIn: false,
  isLoggingOut: false,
  token: null,
  ttl: null,
  userId: null,
  created: null,
})

export default handleActions({
  'Session:GetCookie': (state, action) => {
    return state
      .merge({
        created: action.payload.created,
        token: action.payload.token,
        ttl: action.payload.ttl,
        userId: action.payload.userId,
      })
  },
}, defaultState)

/*
(state = defaultState, action) => {
  switch (action.type) {
    case 'user:login:start':
      return state.merge({
        isLoggingIn: true,
      })

    case 'user:login:success':
      return state.merge({
        isLoggingIn: false,
      })

    case 'user:login:failure':
      return state.merge({
        isLoggingIn: false,
      })

    case 'user:logout:start':
      return state.merge({
        isLoggingOut: true,
      })

    case 'user:logout:success':
      return state.merge({
        isLoggingOut: false,
      })

    case 'user:logout:failure':
      return state.merge({
        isLoggingOut: false,
      })

    case 'user:get-cookie:start':
      return state.merge({
        isLoggingIn: true,
      })

    case 'user:get-cookie:success':
      return state.merge({
        isLoggingIn: false,
        created: action.payload.created,
        token: action.payload.token,
        ttl: action.payload.ttl,
        userId: action.payload.userId,
      })

    case 'user:get-cookie:failure':
      return defaultState

    case 'user:set-cookie:success':
      return state.merge({
        isLoggingIn: false,
        created: action.payload.created,
        token: action.payload.token,
        ttl: action.payload.ttl,
        userId: action.payload.userId,
      })

    case 'user:set-cookie:failure':
      return state

    case 'user:clear-cookie:success':
      return state

    default:
      return state
  }
}
*/
