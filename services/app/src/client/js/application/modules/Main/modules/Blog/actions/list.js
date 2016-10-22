import { createAction } from 'redux-actions'

import listService from '../services/list'

export default createAction('main:blog:list', listService)
