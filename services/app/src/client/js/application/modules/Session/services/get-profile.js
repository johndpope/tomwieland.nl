import hl from 'highland'
import { createAction } from 'redux-actions'

const getProfileStart = createAction('user:get-profile:start')
const getProfileSuccess = createAction('user:get-profile:success')
const getProfileFailure = createAction('user:get-profile:failure')

// const User = global.loopbackApplication.models.User

export default (token, userId) => {
  const output = hl()

  output.write(getProfileStart())

  // TODO: Reimplement.
  /*
  User.findOne({
    token,
    userId,
  }, (error, result) => {
    if (error) {
      output.write(getProfileFailure(error))
    } else {
      output.write(getProfileSuccess(result))
    }
  })
  */

  return output
}
