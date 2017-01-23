import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.model('BlogComment', {
  tableName: 'blogposts',

  blogpost: () => {
    return this.hasOne(db.model('BlogPost'))
  },

  user: () => {
    return this.hasOne(db.model('User'))
  },
})
