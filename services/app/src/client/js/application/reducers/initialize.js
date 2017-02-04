import immutable from 'seamless-immutable'

const defaultState = immutable({
  isInitializing: false,
  hasSucceeded: false,
  hasFailed: false,
  error: undefined,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'initialize:start':
      return state
        .merge({
          isInitializing: true,
        })

    case 'initialize:failure':
      return state.merge({
        isInitializing: false,
        isFetching: false,
        hasSucceeded: false,
        hasFailed: true,
        error: immutable(action.payload),
      })

    case 'initialize:success':
      return state.merge({
        isInitializing: false,
        isFetching: false,
        hasSucceeded: true,
        hasFailed: false,
        error: undefined,
      })

    default:
      return state
  }
}
