hl = require \highland

# Returns a Highland Stream with the start and success or error actions
# containing the result of the request.
module.exports = (url, options, start-action, success-action, error-action, record) ->
  output = hl!

  output.write start-action record

  fetch url, options
    .then  (.json!)
    .then  (result) !-> output.write success-action result, record
    .catch (error)  !-> output.write error-action   error, record

  output
