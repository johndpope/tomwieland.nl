import routes from './routes'
import Blog from './modules/Blog'

export default {
  name: 'Main',
  routes,
  submodules: [
    Blog,
  ],
}
