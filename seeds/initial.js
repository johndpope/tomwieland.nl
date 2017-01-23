exports.seed = (knex) => {
  return Promise
    .all([
      knex('users').del(),

      knex('tags').del(),

      knex('blogposts').del(),

      knex('blogcomments').del(),
    ])

    .then(() => {
      return Promise.all([
        knex('users').insert({
          id: 1,
          email: 'admin@test.com',
          username: 'admin',
          password: 'admin',
        }),

        knex('users').insert({
          id: 2,
          email: 'moderator@test.com',
          username: 'moderator',
          password: 'moderator',
        }),

        knex('users').insert({
          id: 3,
          email: 'member@test.com',
          username: 'member',
          password: 'member',
        }),

        knex('users').insert({
          id: 4,
          email: 'user@test.com',
          username: 'user',
          password: 'user',
        }),
      ])
    })

    .then(() => {
      return Promise.all([
        knex('tags').insert({
          id: 1,
          label: 'Alpha',
        }),

        knex('tags').insert({
          id: 2,
          label: 'Beta',
        }),

        knex('tags').insert({
          id: 3,
          label: 'Gamma',
        }),

        knex('tags').insert({
          id: 4,
          label: 'Delta',
        }),

        knex('tags').insert({
          id: 5,
          label: 'Epsilon',
        }),
      ])
    })

    .then(() => {
      return Promise.all([
        knex('blogposts').insert({
          id: 1,
          title: 'Blog Post One',
          slug: 'blog-post-one',
          body: 'Body One',
          created: new Date(),
          updated: new Date(),
          user_id: 2,
        }),

        knex('blogposts').insert({
          id: 2,
          title: 'Blog Post Two',
          slug: 'blog-post-two',
          body: 'Body Two',
          created: new Date(),
          updated: new Date(),
          user_id: 2,
        }),

        knex('blogposts').insert({
          id: 3,
          title: 'Blog Post Three',
          slug: 'blog-post-three',
          body: 'Body One',
          created: new Date(),
          updated: new Date(),
          user_id: 2,
        }),

        knex('blogposts').insert({
          id: 4,
          title: 'Blog Post Four',
          slug: 'blog-post-four',
          body: 'Body Four',
          created: new Date(),
          updated: new Date(),
          user_id: 2,
        }),

        knex('blogposts').insert({
          id: 5,
          title: 'Blog Post Five',
          slug: 'blog-post-five',
          body: 'Body Five',
          created: new Date(),
          updated: new Date(),
          user_id: 2,
        }),
      ])
    })

    .then(() => {
      return Promise.all([
        knex('blogposts_tags').insert({
          blogpost_id: 1,
          tag_id: 1,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 1,
          tag_id: 2,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 2,
          tag_id: 2,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 2,
          tag_id: 3,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 3,
          tag_id: 3,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 3,
          tag_id: 4,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 4,
          tag_id: 4,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 4,
          tag_id: 5,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 5,
          tag_id: 5,
        }),

        knex('blogposts_tags').insert({
          blogpost_id: 5,
          tag_id: 1,
        }),
      ])
    })

    .then(() => {
      return Promise.all([
        knex('blogcomments').insert({
          id: 1,
          body: 'Blog Comment One',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 1,
        }),

        knex('blogcomments').insert({
          id: 2,
          body: 'Blog Comment Two',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 1,
        }),

        knex('blogcomments').insert({
          id: 3,
          body: 'Blog Comment Three',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 1,
        }),

        knex('blogcomments').insert({
          id: 4,
          body: 'Blog Comment Four',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 2,
        }),

        knex('blogcomments').insert({
          id: 5,
          body: 'Blog Comment Five',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 2,
        }),

        knex('blogcomments').insert({
          id: 6,
          body: 'Blog Comment Six',
          updated: new Date(),
          user_id: 3,
          blogpost_id: 2,
        }),

        knex('blogcomments').insert({
          id: 7,
          body: 'Blog Comment Seven',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 3,
        }),

        knex('blogcomments').insert({
          id: 8,
          body: 'Blog Comment Eight',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 3,
        }),

        knex('blogcomments').insert({
          id: 9,
          body: 'Blog Comment Nine',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 3,
        }),

        knex('blogcomments').insert({
          id: 10,
          body: 'Blog Comment Ten',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 4,
        }),

        knex('blogcomments').insert({
          id: 11,
          body: 'Blog Comment Eleven',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 4,
        }),

        knex('blogcomments').insert({
          id: 12,
          body: 'Blog Comment Twelve',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 4,
        }),

        knex('blogcomments').insert({
          id: 13,
          body: 'Blog Comment Thirteen',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 5,
        }),

        knex('blogcomments').insert({
          id: 14,
          body: 'Blog Comment Fourteen',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 5,
        }),

        knex('blogcomments').insert({
          id: 15,
          body: 'Blog Comment Fifteen',
          created: new Date(),
          updated: new Date(),
          user_id: 3,
          blogpost_id: 5,
        }),
      ])
    })
}
