import async from 'async'
import admin from './admin'

export default (app, cb) => {
  async.series([
    (cb) => { admin(app, cb) },
  ], cb)
}
