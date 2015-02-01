var loadSails = require('./loadSails.js');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
    var uid = process.argv[2];
    if (! Number(uid) ) return doneAll('Invalid Uid');
    User.findOneById(uid)
    .exec(function (err, user) {
			if(err) return doneAll(err);
			user.isAdmin = true;
			user.save(doneAll);
    });
		
  });
}

function doneAll(err) {
  if ( err ) {
    sails.log.error('Error on set user as admin', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();