const http = require('http');

const server = http.createServer();
const port = process.env.PORT || 3000;

server.once('listening', () => {
  console.log(`http://0.0.0.0:${port}`);
});

server.on('request', (req, res) => {
  res.write('lol');
  res.end();
});

server.on('error', console.error);

server.listen(port);
