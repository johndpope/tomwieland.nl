import hl from 'highland'

export default (url, options, startAction, successAction, errorAction, record) => {
  const output = hl()

  output.write(startAction(record))

  fetch(url, options)
    .then(it => it.json())
    .then((result) => {
      output.write(successAction(result, record))
    })
    .catch((error) => {
      output.write(errorAction(error, record))
    })

  return output
}
