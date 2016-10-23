import { connect } from 'react-redux'

import Login from './Login'
import loginAction from '../../../Session/actions/login'

export default connect((state) => {
  return {
    session: state.Application.Session.session,
    profile: state.Application.Session.profile
  }
}, (dispatch) => {
  return {
    handleLogin: (email, password) => {
      return dispatch(loginAction(email, password))
    }
  }
})(Login)
