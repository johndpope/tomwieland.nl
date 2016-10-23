import { createAction } from 'redux-actions'

import loginService from '../services/login'

export default createAction('user:login', loginService)
