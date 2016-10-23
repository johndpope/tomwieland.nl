import { createAction } from 'redux-actions'

import logoutService from '../services/logout'

export default createAction('user:logout', logoutService)
