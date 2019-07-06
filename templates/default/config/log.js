try {
  module.exports = require('./log-local.js');
} catch(e) {
  const winston = require('winston');

  const transports = [
    new (winston.transports.Console)({
      level: process.env.LOG_LV || 'info',
      json: true,
      stringify: true
    })
  ];

  module.exports.log = {
    level: process.env.LOG_LV || 'info' ,
    colorize: false,
    timestamp: true,
    json: true,
    stringify: true,
    prettyPrint: false,
    depth: 5,
    showLevel: true,
    transports: transports
  };
}


