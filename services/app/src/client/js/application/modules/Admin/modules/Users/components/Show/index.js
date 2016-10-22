import { connect } from 'react-redux'

import Show from './Show'
import actions from '../../actions'

export default connect((state) => {
  return {
    session: state.Application.Session.session,
    users: state.Application.Admin.Users.users
  }
}, (dispatch) => {
  return {
    handleShow: (token, email) => {
      return dispatch(actions.fetchOne(token, email))
    },
    navigateToList: (email) => {
      return dispatch(push("/admin/users"))
    },
    navigateToEdit: (email) => {
      return dispatch(push("/admin/users/" + email + "/edit"))
    }
  }
})(Show)
