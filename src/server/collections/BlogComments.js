import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.collection('BlogComments', {
  model: 'BlogComment',
})
