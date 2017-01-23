import { getBookshelfHandler } from '../database'

const db = getBookshelfHandler()

export default db.model('Tag', {
  tableName: 'tags',

  blogposts: () => {
    return this.belongsToMany(db.model('BlogPost'))
  },
})
