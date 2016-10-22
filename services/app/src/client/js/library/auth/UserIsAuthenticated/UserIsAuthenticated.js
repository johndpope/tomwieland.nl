import { UserAuthWrapper } from 'redux-auth-wrapper'

export default UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: replace,
  authSelector: ({ Application }) => Application.Session.profile.id,
})
