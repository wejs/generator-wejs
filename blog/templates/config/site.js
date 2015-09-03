var path = require('path');
module.exports = {
  appName: 'We.js blog',
  subtitle: 'A awsome we.js blog',

  // default favicon, change in your project config/local.js
  favicon: path.resolve(__dirname, '..', 'files/public/favicon.png'),
  // logo public url path
  appLogo: '/public/project/logo.jpg',

  site: {
    homeBg :'/public/project/home-bg.jpg'
  }
}