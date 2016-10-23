import { createAction } from 'redux-actions'

import fetchApi from '../../../../../../library/fetch-api'

const mainBlogShowStart = createAction('main:blog:show:start')
const mainBlogShowSuccess = createAction('main:blog:show:success')
const mainBlogShowFailure = createAction('main:blog:show:failure')

export default (token, slug) => {
  const filter = JSON.stringify({
    where: {
      slug,
    },
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

  return fetchApi(url, options, mainBlogShowStart, mainBlogShowSuccess, mainBlogShowFailure)
}
