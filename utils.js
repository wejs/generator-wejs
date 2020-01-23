const path = require('path'),
  crypto = require("crypto"),
  indent = '      ';

const utils = {
  databaseAssociationTypes: [
    'belongsTo', 'hasMany', 'hasOne'
  ],
  getWe() {
    try {
      let projectFolder = process.cwd();
      let We = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return new We();
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.error('we-core not found, this generator only works in project root folder');
        process.exit();
      } else {
        throw e;
      }
    }
  },

  getRandomString() {
    return crypto.randomBytes(20).toString('hex');
  },

  addNpmModules(g) {
    utils.setDbDialectModules(g);

    g.fs.copyTpl(
      g.templatePath('_package.json'),
      g.destinationPath(g.projectFolder + 'package.json'),
      g
    );

    g.npmModulesToInstall = g.npmModulesToInstall
      .concat(Object.keys(g.wejsPLuginsToInstall));

    g.log('Installing the dependencies: ' + g.npmModulesToInstall.join(' '));

    const pkgJson = {
      dependencies: g.npmModulesToInstall,
      devDependencies: g.devNpmModulesToInstall
    };

    g.fs.extendJSON(g.destinationPath(g.projectFolder + 'package.json'), pkgJson);
  },

  setDbDialectModules(g) {
    switch (g.appConfigs.dbDialect) {
      case 'sqlite':
        g.npmModulesToInstall.push('sqlite3');
        g.npmModulesToInstall.push('connect-sqlite3');
        break;
      case 'postgres':
        g.npmModulesToInstall.push('pg');
        g.npmModulesToInstall.push('pg-hstore');
        break;
      default:
        // default users mysql db and redis session for production and sqlite for development:
        g.npmModulesToInstall.push('mysql2');
        g.npmModulesToInstall.push('express-mysql-session');
        g.npmModulesToInstall.push('redis');
        g.npmModulesToInstall.push('connect-redis');
        g.devNpmModulesToInstall.push('sqlite3');
        g.devNpmModulesToInstall.push('connect-sqlite3');
    }
  }
};

utils.getModelAttrsFromArgs = function(args) {
  let text = '';

  args
  .filter( (a)=> {
    if (a == args[0]) return false;
    return true;
  })
  .filter( (a)=> {
    let aItens = a.split(':');
    if (
      aItens[1] &&
      utils.databaseAssociationTypes.indexOf(aItens[1])>-1
    ) {
      return false; // is assoc
    } else {
      return true
    }
  })
  .forEach( (a, i, arr)=> {
    let aItens = a.split(':');

    if (
      aItens[1] &&
      utils.databaseAssociationTypes.indexOf(aItens[1])>-1
    ) return; // is assoc

    text += aItens[0]+': {\n'+indent;
    text += utils.renderModelAttribute(aItens);

    if ( (arr.length-1) == i) {
      text += '}\n'+indent;
    } else {
      text += '},\n'+indent;
    }
  });

  return text;
}

utils.renderModelAttribute = function (aItens) {
  let text = '';

  if (aItens.length > 1) {
    text += '  type: \''+aItens[1].toUpperCase()+'\'';

    if (aItens.length <= 2) {
      text += '\n'+indent;
      return text;
    }

    text += ',\n'+indent;

    if (aItens.length > 2) {
      for (let i = 2; i < aItens.length; i++) {
        let att = aItens[i].split('=');

        if ( (aItens.length-1) == i) {
          // last item
          text += '  '+att[0]+': '+ att[1]+'\n'+indent;
        } else {
          text += '  '+att[0]+': '+ att[1]+',\n'+indent;
        }

      }
    }
  } else {
    return '  type: \'STRING\'\n'+indent;
  }

  return text;
}


utils.getModelAssocsFromArgs = function (args) {
  let text = '';

  args
  .filter( (a)=> {
    if (a.indexOf(':') > 0) return true;
  })
  .filter( (a)=> {
    let aItens = a.split(':');
    if (utils.databaseAssociationTypes.indexOf(aItens[1])>-1) {
      return true;
    } else {
      return false;
    }
  })
  .forEach( (a, i, arr)=> {
    let aItens = a.split(':');

    text += '\''+aItens[0]+'\': {\n'+indent;
    text += utils.renderModelAssociation(aItens);

    if ( (arr.length-1) == i) {
      text += '}\n'+indent;
    } else {
      text += '},\n'+indent;
    }
  });

  return text;
}

utils.renderModelAssociation = function (aItens) {
  let text = '';

  if (aItens.length > 1) {
    text += '  type: \''+aItens[1] + '\',\n'+indent;
    text += '  model: \''+aItens[2]+'\'';

    if (aItens.length < 4) {
    // dont have more configs
      text += '\n'+indent;
      return text;
    }

    text += ',\n'+indent;

    if (aItens.length > 3) {
      for (let i = 3; i < aItens.length; i++) {
        let att = aItens[i].split('=');

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