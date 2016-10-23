import { createAction } from 'redux-actions'

import showService from '../services/show'

export default createAction('main:blog:show', showService)
