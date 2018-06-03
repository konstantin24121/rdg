const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const low = require('lowdb');
const socetio = require('socket.io');
const lodashId = require('lodash-id');
const FileAsync = require('lowdb/adapters/FileAsync');

const createApi = require('./api');

const makeProdServer = require('./prod-server');

const isDevelopment = process.env.NODE_ENV === 'development';
const serverPath = path.join(process.cwd(), 'server');

const app = express();
app.set('port', (+process.env.PORT) || 3000);
app.use(bodyParser.json());

const httpServer = http.createServer(app);
const adapter = new FileAsync(path.join(serverPath, 'db.json'));

low(adapter).then((db) => {
  db._.mixin(lodashId);
  // Rewrite lodashId createID function
  // Use increment instead uuid
  // https://github.com/typicode/lodash-id
  // eslint-disable-next-line no-param-reassign
  db._.createId = function createId(collection) {
    const last = this.last(collection);
    return last ? last.id + 1 : 0;
  };

  // Create socket
  const io = socetio(httpServer);
  if (isDevelopment) {
    const makeDevServer = require('./dev-server');
    makeDevServer(app);
  } else {
    makeProdServer(app);
  }

  createApi(app, db, io);

  io.on('connect', (socket) => {
    // Send to user webSocketId
    socket.emit('websocetId', { id: socket.id });
  });

  // Set db default values
  return db.defaults({ deals: [] }).write();
}).then(() => {
  httpServer.listen(app.get('port'), (err) => {
    if (err) return console.error(err);
    return console.info(`==> 💻  Open http://localhost:${app.get('port')} in a browser to view the app.`);
  });
});
