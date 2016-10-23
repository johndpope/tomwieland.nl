import routes from './routes'
import users from './modules/users'
export default {
  name: 'Admin',
  routes: routes,
  modules: [users]
}
