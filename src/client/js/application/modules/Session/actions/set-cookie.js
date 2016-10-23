import { createAction } from 'redux-actions'

import setCookieService from '../services/set-cookie'

export default createAction('user:set-cookie', setCookieService)
