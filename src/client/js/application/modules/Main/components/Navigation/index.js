import { connect } from 'react-redux'

import Navigation from './Navigation'

import logoutAction from '../../../Session/actions/logout'

export default connect(
  (state) => {
    return {
      session: state.Application.Session.session,
      profile: state.Application.Session.profile,
    }
  },
  (dispatch) => {
    return {
      logout: () => dispatch(logoutAction()),
    }
  }
)(Navigation)
