const express = require('express');
const makeDevServer = require('./dev-server');
const makeProdServer = require('./prod-server');

const host = process.env.HOST || 'localhost';
const port = (+process.env.PORT) || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

const server = express();

if (isDevelopment) {
  makeDevServer(server);
} else {
  makeProdServer(server);
}

server.listen(port, host, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
});
