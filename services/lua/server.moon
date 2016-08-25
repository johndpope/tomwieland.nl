print "server.moon"

zmq = require "lzmq"
pl  = require "penlight"

print "server.moon/zmq", pl.pretty.print zmq

context = zmq.context!

print "server.moon/context", context

socket = context:socket zmq.REP,
  bind: "tcp://*.3000"

print "server.moon/socket", socket

--
--while true do
--  request = socket:recv!
--
--  print "Request:", request
--
--  socket:send "World"

-- socket:close!
-- context:term!
