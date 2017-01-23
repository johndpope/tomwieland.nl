import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.collection('BlogPosts', {
  model: 'BlogPost',
})
