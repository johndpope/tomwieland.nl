import { connect } from 'react-redux'

import List from './List'
import actions from '../../actions'

export default connect((state) => {
  return {
    session: state.Application.Session.session,
    users: state.Application.Admin.Users.users
  }
}, (dispatch, state) => {
  return {
    handleDelete: (token, id) => {
      return dispatch(actions['delete'](token, id))
    },
    handleList: (token, skip, limit, order) => {

      skip == null && (skip = 0)
      limit == null && (limit = 10)
      order == null && (order = 'username ASC')
      records = global.store.getState().Application.Admin.Users.users
      return dispatch(actions.fetch(records, token, skip, limit, order))
    },
    navigateToShow: (id) => {
      return dispatch(push("/admin/users/" + id))
    },
    navigateToEdit: (id) => {
      return dispatch(push("/admin/users/" + id + "/edit"))
    },
    showDeleteModal: (id) => {
    }
  }
})(List)
