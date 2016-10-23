import immutable from 'seamless-immutable'

const defaultState = immutable({
  isFetching: false,
  id: null,
  username: null,
  email: null,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'user:get-profile:start':
      return state
        .merge({
          isFetching: true,
        })

    case 'user:get-profile:failure':
      return defaultState

    case 'user:get-profile:success':
      return state
        .merge({
          isFetching: false,
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.username,
        })

    case 'user:logout:success':
      return state

    default:
      return state
  }
}
