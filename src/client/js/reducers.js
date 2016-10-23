import application from './application'
import { getReducers } from './library/module'

// This file exists to wrap the components for Hot Module Reloading.
export default getReducers(application)
