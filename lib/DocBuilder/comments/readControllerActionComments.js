const comments = require('js-comments'),
  fs = require('fs');

module.exports = function readControllerActionComments(controllerPath, actions) {
  let str = fs.readFileSync(controllerPath, 'utf8');
  let c = comments.parse(str, {});

  // Get each action in the controller:
  c.forEach( (action)=> {
    console.log('Action>', action.apiName);
    if (action.apiName) {
      actions[action.apiName] = action;
    }
  });

  return actions;
};