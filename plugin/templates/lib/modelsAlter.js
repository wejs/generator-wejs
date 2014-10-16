/**
 * modelsAlter hook
 *
 * run after we.js load all plugin resources and after sails.js process the model schemes
 * use it to alter a model or insert extra attributes in other plugin module
 *
 * @param  {object}   sails current sails.js object
 * @param  {Function} cb    callback
 */
module.exports = function modelsAlter(sails, cb) {
  // models scheme are avaible in sails.models['model-name']

  // Always remember to run the callback
  cb();
};