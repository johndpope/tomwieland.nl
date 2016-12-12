import reducers from './reducers'
import routes from './routes'

import Admin from './modules/Admin'
import Main from './modules/Main'
import Session from './modules/Session'

export default {
  name: 'Application',
  reducers,
  routes,
  modules: [
    Admin,
    Main,
    Session,
  ],
}
