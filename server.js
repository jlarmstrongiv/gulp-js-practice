const staticServer = require('static-server');

const server = new staticServer({
  rootPath: './public/',
  port: 9345
});

server.start(() => {
  console.log('server on ' + server.port);
});
