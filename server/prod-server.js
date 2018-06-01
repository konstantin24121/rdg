const path = require('path');
const express = require('express');

const publicPath = path.join(process.cwd(), 'public');

module.exports = function makeprodServer(app) {
  app.use(express.static(publicPath));

  app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
};
