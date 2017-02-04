import immutable from 'seamless-immutable'

const defaultState = immutable({
  isFetching: false,
  id: null,
  username: null,
  email: null,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'Session:GetProfile:Start':
      return state
        .merge({
          isFetching: true,
        })

    case 'Session:GetProfile:Failure':
      return defaultState

    case 'Session:GetProfile:Success':
      return state
        .merge({
          isFetching: false,
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.username,
        })

    case 'Session:Logout:Success':
      return state

    default:
      return state
  }
}
