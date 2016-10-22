import { createAction } from 'redux-actions'

import fetchApi from '../../../../../../library/fetch-api'

const mainBlogListStart = createAction('main:blog:list:start')
const mainBlogListSuccess = createAction('main:blog:list:success')
const mainBlogListFailure = createAction('main:blog:list:failure')

export default (token, skip = 0, limit = 100, order = 'created DESC') => {
  const filter = JSON.stringify({
    skip,
    limit,
    order,
  })

  const url = `${window.location.origin}/api/blogposts?filter=${filter}`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
  }

  return fetchApi(url, options, mainBlogListStart, mainBlogListSuccess, mainBlogListFailure)
}
