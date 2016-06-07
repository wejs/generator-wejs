var ncu = require('npm-check-updates');
var async = require('async');


async.series([
  function updateApp(done) {
    ncu.run({
      packageFile: 'app/templates/_package.json',
      // Any command-line option can be specified here.
      // These are set by default:
      // silent: true,
      jsonUpgraded: false,
      upgrade: true,
      upgradeAll: true
    }).then(function () {
      console.log('Upgrated app project');
      done();
    }).catch(done);
  },
  function updateBlog(done) {
    ncu.run({
      packageFile: 'blog/templates/_package.json',
      jsonUpgraded: false,
      upgrade: true,
      upgradeAll: true
    }).then(function () {
      console.log('Upgrated blog project');
      done();
    }).catch(done);
  },
  function updateEvents(done) {
    ncu.run({
      packageFile: 'events/templates/_package.json',
      jsonUpgraded: false,
      upgrade: true,
      upgradeAll: true
    }).then(function () {
      console.log('Upgrated events project');
      done();
    }).catch(done);
  },
  // function updateSocial(done) {
  //   ncu.run({
  //     packageFile: 'social/templates/_package.json',
  //     jsonUpgraded: false,
  //     upgrade: true,
  //     upgradeAll: true
  //   }).then(function () {
  //     console.log('Upgrated social project');
  //     done();
  //   }).catch(done);
  // },
  function updatePlugin(done) {
    ncu.run({
      packageFile: 'plugin/templates/_package.json',
      jsonUpgraded: false,
      upgrade: true,
      upgradeAll: true
    }).then(function () {
      console.log('Upgrated plugin project');
      done();
    }).catch(done);
  }
], function doneAll(err) {
  if (err) console.error(err);
})


