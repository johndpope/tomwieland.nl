import { createAction } from 'redux-actions'

import getProfileService from '../services/get-profile'

export default createAction('user:get-profile', getProfileService)
