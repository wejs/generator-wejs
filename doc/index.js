var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var utils = require('../utils');

var YAML = require('json2yaml');
var mime = require('mime');
var we, methods = ['get', 'post', 'put', 'delete'];

var WejsGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: false });

    we = utils.getWe();
  },
  prompting: function () {
    this.log(yosay(
      'Swagger Documentation generator!'
    ));
  },

  writing: {
    app: function () {
      var self = this;
      var done = this.async();

      buildSwaggerFile(we, function (err, ymlText, jsonText) {
        if(err) return doneAll(err);

        self.ymlText = ymlText;
        self.jsonText = jsonText;

        self.template('swagger.yaml', 'api/swagger/swagger.yaml');
        self.template('swagger.json', 'api/swagger/swagger.json');

        done();
      });
    }
  },

  install: function () {
    doneAll();
  }
});


module.exports = WejsGenerator;

function buildSwaggerFile (we, cb) {

  we.bootstrap(function (err, we) {
    if (err) return doneAll(err);

    we.pluginManager.getPluginsToUpdate(function (err) {
      if (err) return doneAll(err);

      var jsonFile = {
        swagger: '2.0',
        info: {
          version: '0.0.1', // todo get from package.json
          title: we.config.appName
        },
        host: we.config.hostname.replace('http://','').replace('https://', ''),
        basePath: '/',
        schemes: [ 'http', 'https' ],
        consumes: ['application/json'],
        produces: we.config.responseTypes.map(function(t){
          return mime.lookup(t);
        }),

        paths: {},
        definitions: {}
      };

      // get route lists
      var routes = Object.keys(we.routes);
      var route, p, wejsP, method;

      for (var i = 0; i < routes.length; i++) {

        route = routes[i].split(' ');
        wejsP = ((route.length > 1)? route[1]: route[0]);

        p = convertPathToSwaggerRoute(wejsP, we);

        if (p.indexOf('/admin') === 0) continue; // skip admin pages

        if (!jsonFile.paths[p]) jsonFile.paths[p] = {};

        if (methods.indexOf(route[0]) > -1) {
          method = route[0];
        } else {
          method = 'get';
        }

        var name = method+ '_' + we.routes[routes[i]].controller + '_' +we.routes[routes[i]].action;

        if (we.routes[routes[i]].parent) {
          name = we.routes[routes[i]].parent+ '_' + name;
        }

        if (we.routes[routes[i]].name) {
          name = we.routes[routes[i]].name+ '_' + name;
        }

        name = method +'::' + p

        jsonFile.paths[p][method] = {
          operationId: name,
          parameters: getPathParams(wejsP, we, method, we.routes[routes[i]]),
          responses: {}
        };

        switch(method) {
          case 'post':
            jsonFile.paths[p][method].responses = {
              '201': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };

            if (we.routes[routes[i]].action == 'create') {
              jsonFile.paths[p][method].responses['201'].schema = {
                '$ref': '#/definitions/'+we.routes[routes[i]].model
              }
            }

            break;
          case 'put':
            jsonFile.paths[p][method].responses = {
              '200': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };

            if (we.routes[routes[i]].action == 'edit') {
              jsonFile.paths[p][method].responses['200'].schema = {
                '$ref': '#/definitions/'+we.routes[routes[i]].model
              }
            }

            break;
          case 'delete':
            jsonFile.paths[p][method].responses = {
              '204': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };
            break;
          default:
            // get
            jsonFile.paths[p][method].responses = {
              '200': {
                description: 'Success',

              },
              'default': {
                description: 'Success'
              }
            };

            if (we.routes[routes[i]].action == 'find') {
              jsonFile.paths[p][method].responses['200'].schema = {
                type: 'array',
                items: {
                  '$ref': '#/definitions/'+we.routes[routes[i]].model
                }
              }
            } else if (we.routes[routes[i]].action == 'findOne') {
              jsonFile.paths[p][method].responses['200'].schema = {
                '$ref': '#/definitions/'+we.routes[routes[i]].model
              }
            }
        }

        jsonFile.paths['/swagger'] = { 'x-swagger-pipe': 'swagger_raw' };

        jsonFile.definitions = getSwaggerDefinitions(we);
      }

      var jsonText = JSON.stringify(jsonFile, null, 2);
      var ymlText = YAML.stringify(jsonFile);

      cb(null, ymlText, jsonText);
    });
  })
}

function convertPathToSwaggerRoute(p, we) {
  var pParts = we.router.parseRouteToMap(p);

  return pParts.map(function (part){
    if (!part) return '';
    if (typeof part == 'object') {
      if (part.name.indexOf('Id') > -1) {
        return '{'+ parseParam(part) +'}';
      } else {
        return '{'+ parseParam(part) +'}';
      }
    }

    return part;
  }).join('/');
}

function parseParam(pathPart) {
  var param = 'id';

  if (typeof pathPart == 'object' && pathPart.name) {
    param = pathPart.name.replace(':', '');
    if (param.indexOf('(') >-1) {
      param = ( param.split('(')[0] );
    }
  } else {
    console.log('unknow param:', pathPart);
  }

  return param;
}

function getPathParams(p, we, method, configs) {
  var pParts = we.router.parseRouteToMap(p);
  var bodyParams = [];
  var cfgs;

// name: user
// in: body
// description: user to add to the system
// required: true
// schema:
//   $ref: '#/definitions/User'

  var pathParams = pParts
  .filter(function(part){
    if (!part) return false;
    if (typeof part != 'object') return false;
    return true;
  })
  .map(function (part) {
    if (part.name.indexOf('Id') > -1) {

      var name = parseParam(part);
      var type = 'string';

      if (part.name.indexOf('([0-9]+)') >-1) type = 'integer'

      return {
        name: name,
        in: 'path',
        required: true,
        type: 'integer'
      }
    } else {
      return {
        name: ( parseParam(part) ),
        in: 'path',
        required: true,
        type: 'integer'
      }
    }
  });


  if ( (method == 'post' || method == 'put') && configs.model) {
    cfgs = {
      name: configs.model,
      in: 'body',
      description: configs.action+' '+configs.model,
      required: true
    }

    if (configs.model) {
      cfgs.schema = { '$ref': '#/definitions/' + configs.model };
    }

    bodyParams.push(cfgs);
  }

  return pathParams.concat(bodyParams);
}

function getSwaggerDefinitions(we) {
  var definitions = {};

  var modelNames = Object.keys(we.db.modelsConfigs);

  modelNames.filter(function (mc) {
     if (!we.db.modelsConfigs[mc].definition) return false;
     return true;
  })
  .map(function chageValueToDefinition(mc) {
    definitions[mc] = {
      type: 'object',
      properties: {}
    };

    return {
      name: mc,
      definition: we.db.modelsConfigs[mc].definition
    };
  })
  .forEach(function setDefinition(mcd) {
    var attrNames = Object.keys(mcd.definition);

    attrNames.forEach(function (mcdna) {
      if (mcdna == 'metadata') return;
      if (String(mcd.definition[mcdna].type) == 'VIRTUAL') return;

      definitions[mcd.name].properties[mcdna] = {
        type: resolveModelAttrType(mcd.definition[mcdna].type)
      }

    })
  });

  return definitions;
}

function resolveModelAttrType(attr) {
  var attrS = String(attr);

  if ( (attrS.indexOf('VAR') > -1) || (attrS.indexOf('TEX')  > -1)) {
    return 'string';
  }

  if ( (attrS.indexOf('INT') >-1) || (attrS.indexOf('NUM') > -1)) {
    return 'number';
  }

  if (attrS.indexOf('BOO')) {
    return 'boolean';
  }

  return 'string'
}

function doneAll(err) {
  if ( err ) we.log.error('Error:', err);
  we.exit(function(){ process.exit(); });
}