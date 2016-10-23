import path from 'path'

export default () =>
  (req, res, next) =>
    res.sendFile(path.resolve(`${__dirname}/../../client/index.html`))
