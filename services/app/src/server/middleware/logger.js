import morgan from 'morgan'

export default (app, cb) => {
  app.use(morgan('dev'))
  cb()
}
