
var indent = '      ';
var utils = {
  databaseAssociationTypes: [
    'belongsTo', 'hasMany', 'hasOne'
  ]
};

utils.getModelAttrsFromArgs = function getModelAttrsFromArgs(args) {
  var text = '';

  args
  .filter(function (a){
    if (a.indexOf(':')>0) return true;
  })
  .forEach(function (a){
    var aItens = a.split(':');

    text += aItens[0]+': {\n'+indent;
    text += utils.renderModelAttribute(aItens);
    text += '},\n'+indent;
  });

  return text;
}

utils.renderModelAttribute = function renderModelAttribute(aItens) {
  var text = '';

  if (aItens.length > 1) {
    text += '  type: '+'we.db.Sequelize.'+(aItens[1].toUpperCase())+',\n'+indent;
    if (aItens.length > 2) {
      for (var i = 2; i < aItens.length; i++) {
        var att = aItens[i].split('=');
        text += '  '+att[0]+': '+ att[1]+',\n'+indent;
      }
    }
  } else {
    return 'type: we.db.Sequelize.STRING\n'+indent;
  }

  return text;
}

module.exports = utils;