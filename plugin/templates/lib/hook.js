/**
 * Sails.js hook
 *
 * see sails.js hooks docs for more info
 */

module.exports = function(sails) {
  var hook =  {
    // Default sails.js config
    // (mixed in to `sails.config`)
    defaults: {},
    /**
     * Sails.js initialize hook function
     */
    initialize: function(cb) {
      return cb();
    }
  }
  return hook;
}
