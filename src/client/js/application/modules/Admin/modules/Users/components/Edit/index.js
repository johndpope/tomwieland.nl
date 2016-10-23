import { connect } from 'react-redux'
import getValues from 'redux-form'

import Edit from './Edit'
import actions from '../../actions'

export default connect((state) => {
  return {
    session: state.Application.Session.session,
    user: state.Application.Admin.Users.user,
    users: state.Application.Admin.Users.users
  }
}, (dispatch) => {
  return {
    handleEdit: (token, email) => {
      var record, this$ = this
      record = find((it) => {
        return it.email === email
      }, global.store.getState().Application.Admin.Users.users)
      return dispatch(actions.fetchOne(record, token, email))
    },
    handleSubmit: (token) => {

      store = global.store
      data = getValues(store.getState().form['admin-users-user'])
      return dispatch(actions.update(token, data))
    },
    navigateToShow: (email) => {
      return dispatch(push("/admin/users/" + email))
    },
    navigateToEdit: (email) => {
      return dispatch(push("/admin/users/" + email + "/edit"))
    },
    showDeleteModal: (email) => {
    }
  }
})(Edit)
