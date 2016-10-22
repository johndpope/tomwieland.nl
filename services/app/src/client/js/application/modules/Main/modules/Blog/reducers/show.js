import immutable from 'seamless-immutable'

const defaultState = immutable({
  isFetching: false,
  hasSucceeded: false,
  hasFailed: false,
  error: undefined,
  entry: undefined,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return defaultState

    case 'main:blog:show:start':
      return state.merge({
        isFetching: true,
      })

    case 'main:blog:show:success':
      return state.merge({
        isFetching: false,
        hasSucceeded: true,
        hasFailed: false,
        error: undefined,
        entry: action.payload[0],
      })

    case 'main:blog:show:failure':
      return state.merge({
        isFetching: false,
        hasSucceeded: false,
        hasFailed: true,
        error: action.payload,
        entry: undefined,
      })

    default:
      return state
  }
}
