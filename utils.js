var path = require('path');
var indent = '    ';

var utils = {
  databaseAssociationTypes: [
    'belongsTo', 'hasMany', 'hasOne'
  ],
  getWe: function getWe() {
    try {
      var projectFolder = process.cwd();
      var We = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return new We();
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.error('we-core not found, this generator only works in project root folder');
        process.exit();
      } else {
        throw e;
      }
    }
  }
};

utils.getModelAttrsFromArgs = function getModelAttrsFromArgs(args) {
  var text = '';

  args
  .filter(function (a) {
    if (a == args[0]) return false;
    return true;
  })
  .filter(function (a){
    var aItens = a.split(':');
    if (
      aItens[1] &&
      utils.databaseAssociationTypes.indexOf(aItens[1])>-1
    ) {
      return false; // is assoc
    } else {
      return true
    }
  })
  .forEach(function (a, i, arr){
    var aItens = a.split(':');

    if (
      aItens[1] &&
      utils.databaseAssociationTypes.indexOf(aItens[1])>-1
    ) return; // is assoc

    text += '"'+aItens[0]+'": {\n'+indent;
    text += utils.renderModelAttribute(aItens);

    if ( (arr.length-1) == i) {
      text += '}\n'+indent;
    } else {
      text += '},\n'+indent;
    }
  });

  return text;
}

utils.renderModelAttribute = function renderModelAttribute(aItens) {
  var text = '';

  if (aItens.length > 1) {
    text += '  "type": "'+aItens[1].toUpperCase()+'"';

    if (aItens.length <= 2) {
      text += '\n'+indent;
      return text;
    }

    text += ',\n'+indent;

    if (aItens.length > 2) {
      for (var i = 2; i < aItens.length; i++) {
        var att = aItens[i].split('=');

        if ( (aItens.length-1) == i) {
          // last item
          text += '  "'+att[0]+'": '+ att[1]+'\n'+indent;
        } else {
          text += '  "'+att[0]+'": '+ att[1]+',\n'+indent;
        }

      }
    }
  } else {
    return '  "type": "STRING"\n'+indent;
  }

  return text;
}


utils.getModelAssocsFromArgs = function getModelAssocsFromArgs(args) {
  var text = '';

  args
  .filter(function (a){
    if (a.indexOf(':') > 0) return true;
  })
  .filter(function (a){
    var aItens = a.split(':');
    if (utils.databaseAssociationTypes.indexOf(aItens[1])>-1) {
      return true;
    } else {
      return false;
    }
  })
  .forEach(function (a, i, arr){
    var aItens = a.split(':');

    text += '"'+aItens[0]+'": {\n'+indent;
    text += utils.renderModelAssociation(aItens);

    if ( (arr.length-1) == i) {
      text += '}\n'+indent;
    } else {
      text += '},\n'+indent;
    }
  });

  return text;
}

utils.renderModelAssociation = function renderModelAssociation(aItens) {
  var text = '';

  if (aItens.length > 1) {
    text += '  "type": "'+aItens[1] + '",\n'+indent;
    text += '  "model": "'+aItens[2]+'"';

    if (aItens.length < 4) {
    // dont have more configs
      text += '\n'+indent;
      return text;
    }

    text += ',\n'+indent;

    if (aItens.length > 3) {
      for (var i = 3; i < aItens.length; i++) {
        var att = aItens[i].split('=');

        if ( (aItens.length-1) == i) {
          // last item
          text += '  "'+att[0]+'": '+ att[1]+'\n'+indent;
        } else {
          text += '  "'+att[0]+'": '+ att[1]+',\n'+indent;
        }
      }
    }
  }

  return text;
}


module.exports = utils;