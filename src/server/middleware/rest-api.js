export default (app, cb) => {
  const restApiRoot = app.get('restApiRoot')

  app.use(restApiRoot, app.loopback.rest())

  cb()
}
