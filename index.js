const http = require('http');

function handleRequest(req, res) {
  res.write('lol');
  res.end();
}

const server = http.createServer(handleRequest);

server.listen(process.env.PORT);
