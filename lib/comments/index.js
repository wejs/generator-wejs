var comments = require('js-comments');
var fs = require('fs');

module.exports = function () {
  var p = process.cwd();
  var str = fs.readFileSync(p+'/server/controllers/campaign.js', 'utf8');
  var c = comments.parse(str, {});
  console.log('<>', c);
}