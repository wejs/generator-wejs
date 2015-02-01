module.exports.auth = {
  // in current we.js version OR is provider OR consumer
  isProvider: false,
  isConsumer: true,
  enableLogin: true,

  cookieDomain: null,
  cookieName: 'wetoken',
  cookieMaxAge: 900000,
  cookieSecure: false,

  honeypot: {
    // add a honeypot key to enable this feature
    key: null,
    maxThreatScore: 80,
    // enable honeypot check in tests?
    checkInTests: false
  }
}
