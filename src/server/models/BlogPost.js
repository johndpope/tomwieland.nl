import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.model('BlogPost', {
  tableName: 'blogposts',

  user: () => {
    return this.hasOne(db.model('User'))
  },

  tags: () => {
    return this.belongsToMany(db.model('Tag'))
  },
})
