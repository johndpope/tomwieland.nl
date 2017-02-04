import routes from './routes'
import Article from './modules/Article'

export default {
  name: 'Main',
  routes,
  submodules: [
    Article,
  ],
}
