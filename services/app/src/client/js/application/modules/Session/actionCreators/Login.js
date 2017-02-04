// import log from 'loglevel'
import { createAction } from 'redux-actions'

// Temporary measure
// import { createHashHistory } from 'history'

// Temporary measure
// const history = createHashHistory()

const LoginStart = createAction('Session:Login:Start')
const LoginSuccess = createAction('Session:Login:Success')
const LoginFailure = createAction('Session:Login:Failure')

export default createAction('Session:Login', (dispatch, mutate, options) => {
  dispatch(LoginStart())

  mutate({ variables: options })
    .then((data) => {
      dispatch(LoginSuccess(data.data.UserLoginWithEmail))

      // dispatch(history.push('/admin'))
    })
    .catch((error) => {
      if (error.graphQLErrors) {
        const message = error.graphQLErrors[0].message

        dispatch(LoginFailure(message))
      }

      throw error
    })
})
