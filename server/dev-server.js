/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../implements/webpack.config');

module.exports = function makeDevServer(app) {
  // Delay for API requests
  // when server in development mode
  app.use((req, res, next) => {
    if (/^\/api/.test(req.originalUrl)) {
      setTimeout(next, 1000);
    } else {
      next();
    }
  });

  const compiler = webpack(webpackConfig);

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      timings: true,
      chunks: false,
    },
  }));

  app.use(hotMiddleware(compiler));


  app.get('/', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });
};
