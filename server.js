'use strict';

const express = require('express');

/**
 * Create the express server. If a livereload
 * server is passed in (on dev) use it.
 * @param  {function} livereload An optional livereload server instance
 * @return {app: express, port: number, lrport: number}
 */
module.exports = function(livereload) {

  // create the express app

  const app = express();
  const server = require('http').Server(app);
  const port = process.env.PORT || 3000;
  const lrport = process.env.LR_PORT || 35729;

  // only add snippet if livereload passed into function (from gulp)

  if (livereload) {
    app.use(livereload({port: lrport}));
  }

  // serve from the public folder and bower_components

  app.use(express.static('./public'));
  app.use(express.static('./bower_components'));

  // all non-static requests should return index.html

  app.all('/*', (req, res) => {
    res.sendfile('index.html', {root: 'public'});
  });

  server.listen(port);

  return {app: app, port: port, lrport: lrport}

};
