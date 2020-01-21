const path = require('path');
module.exports = {
  // appName: 'We.js blog',
  // subtitle: 'A awsome we.js blog',

  // default favicon, change in your project config/local.js
  favicon: path.resolve(__dirname, '..', 'files/public/favicon.png'),
  // logo public url path
  appLogo: '/public/project/logo.jpg',

  // Example bg varibale for blog themes, in current we.js themes this variable is set with systemSettings
  site: {
    homeBg :'/public/project/home-bg.jpg'
  }
};