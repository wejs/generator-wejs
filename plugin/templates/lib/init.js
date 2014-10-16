/**
 * wejs init hook how runs in sails.js initialize hook
 *
 * use it to plug some feature on sails.js hooks like passport in before hook
 *
 * @param  {object}   sails current sails.js object
 * @param  {Function} cb    callback
 */
module.exports = function initPlugin(sails, cb) {

  // Always remember to run the callback
  cb();
};
