import { getReducers } from 'redux-id-modules'

import application from './application'

// This file exists to wrap the components for Hot Module Reloading.
export default getReducers(application)
