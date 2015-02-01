var context = require('sails-context').sails.police;

module.exports.policies = {
  '*':  [context, defaultPolicy]
}

function defaultPolicy(req, res, next) {
  if (!req.options) return next();
  req._sails.acl.canPolicy(req, function(err, can) {
    if(err) return res.serverError(err);
    if(can === false) return res.forbidden();
    return next();
  })
}