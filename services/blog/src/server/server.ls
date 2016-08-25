# Requires
path        = require \path
fs          = require \fs
log         = require \loglevel
hl          = require \highland
json-stream = require \JSONStream
uuid        = require \uuid

{
  LOGLEVEL
} = process.env

# Initialization
log.set-level LOGLEVEL

# Variables
events-file-path = path.resolve "#{__dirname}/../events/events.json"

# Functions

# Generic error handler.
handle-error = (error) !->
  log.error error.stack or error.message or error
  process.exit!

# Generate random id's
generate-id = ->
  uuid.v4!

# Get a (memoized) handle to the events file read stream.
_events-read = void
get-events-read  = ->
  _events-read or= fs.create-read-stream events-file-path
  _events-read

# Get a (memoized) handle to the events file write stream.
_events-write = void
get-events-write = ->
  _events-write or= fs.create-write-stream events-file-path
  _events-write

# Generate sequence numbers. When passed a value, first sets the sequence
# counter to that number.
sequence-number = 0
generate-sequence-number = (sequence-value) ->
  if sequence-value
    sequence-number = sequence-value

  sequence-number++
  sequence-number

# Generates an event for an object with a type and payload.
generate-event = ({ type, payload }) ->
  id:        generate-id!
  sequence:  generate-sequence-number!
  type:      type
  payload:   payload

# Creates a file with dummy events.
create-dummy-file = (cb) ->
  log.debug "create-dummy-file"

  hl [ 1 to 5 ]
    .map -> generate-event type: \some-event, payload: foo: it
    .pipe json-stream.stringify false
    .pipe process.stdout
    .done cb

    #.pipe get-events-write!
    #.to-callback (error, result) !->

# Imports the events into the state-db
import-events = ->
  log.debug "import-events"

serve-events = !->
  log.debug "serve-events"

  hl import-events!
    .done !->

start = !->
  log.debug "start"

  events-file-exists <-! fs.exists events-file-path

  events-read = fs.create-read-stream events-file-path

  #if events-file-exists
  #  serve-events!
  #else
  #  create-dummy-file!
  #    .done !->
  #      serve-events!

  error <-! fs.unlink events-file-path
  if error
    return handle-error error

  create-dummy-file!
    .done !->
      serve-events!

start!

#                         [ event-store ]
#                               |
#                             JSON
#                               |
#                               V
#                         [ events-read ]
#                               |
#                             event
#                               |
#                               V
# [ command-handler ] --> [ event-handler ] --diff--> [ state-db ]
#                               |
#                             event
#                               |
#                               V
#                         [ events-write ]
#                               |
#                             JSON
#                               |
#                               V
#                         [ event-store ]
