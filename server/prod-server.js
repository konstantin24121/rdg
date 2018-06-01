const path = require('path');
const express = require('express');

const publicPath = path.join(process.cwd(), 'public');

module.exports = function makeprodServer(server) {
  server.use(express.static(publicPath));

  server.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
};
