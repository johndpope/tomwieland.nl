import { createAction } from 'redux-actions'

import clearCookieService from '../services/clear-cookie'

export default createAction('user:clear-cookie', clearCookieService)
