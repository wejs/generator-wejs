module.exports = function isInstaled() {
  var instaled = false;
  try {
    var installation = require('../config/installation.js').installation;
    if (installation.done === true) {
      instaled = true;
    }
  } catch(e) {
    console.error(e)
  }
  return instaled;
}