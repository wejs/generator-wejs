/**
 * Main app file, load we-core and start the app
 */

const We = require('we-core'),
  we = new We();

we.go(function (err) {
  if (err) return console.error(err);
});