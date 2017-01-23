import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.model('User', {
  tableName: 'users',
})

