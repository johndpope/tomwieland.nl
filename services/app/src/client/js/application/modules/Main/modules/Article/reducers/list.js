import immutable from 'seamless-immutable'

const defaultState = immutable({
  entries: [],
  error: undefined,
  hasFailed: false,
  hasSucceeded: false,
  isFetching: false,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return defaultState

    case 'main:article:list:start':
      return state
        .merge({
          isFetching: true,
        })

    case 'main:article:list:success':
      return state
        .merge({
          entries: action.payload,
          hasSucceeded: true,
        })

    case 'main:article:list:failure':
      return state
        .merge({
          error: action.payload,
          hasFailed: true,
        })

    default:
      return state
  }
}
