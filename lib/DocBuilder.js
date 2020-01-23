const YAML = require('json2yaml'),
  path = require('path'),
  fs = require('fs'),
  os = require('os'),
  _ = require('lodash'),
  swaggerInline = require('swagger-inline');

function DocBuilder(we) {
  this.we = we;
  this.jsonFile = null;

  try {
    this.packageJSON = require(path.join(process.cwd(), 'package.json'));
  } catch(e) {
    console.error('project package.json file not found in current folder, '+
      'please check if you are in one root folder of an we.js project');
    throw e;
  }
}

let methods = ['get', 'post', 'put', 'update', 'delete'];

DocBuilder.prototype = {
  generate() {
    const we = this.we;

    return this.generateSwaggerBaseFile(we)
    .then(({base, data})=> {
      return swaggerInline([
        'server/**/*.js',
        'node_modules/we-*/server/**/*.js'
      ], {
         base: base,
         format: '.json',
         ignore: ['bower_modules/**/*'],
         // logger: console.log,
      })
      .then( (generatedSwagger)=> {

        let commentDocs = JSON.parse(generatedSwagger);

        if (data.paths) {
          for (let pathName in commentDocs.paths) {
            let path = commentDocs.paths[pathName];
            if (data.paths[pathName]) {

              for (let methodName in path) {
                let methods = path[methodName];

                if (data.paths[pathName][methodName]) {
                  for (let attrName in methods) {
                    delete data.paths[pathName][methodName][attrName];
                  }
                }

              }

            }
          }
        }

        let docs = _.merge(commentDocs, data);

        const ctx = {};
        ctx.jsonText = JSON.stringify(docs, null, 2);
        ctx.ymlText = YAML.stringify(docs);
        return ctx;
      });
    })
  },

  getRoutes() {
    return Object.keys(this.we.routes);
  },

  generateSwaggerBaseFile(we) {
    return new Promise((resolve, reject)=> {
      this.jsonFile = this.getStaticFileData();
      const jsonFile = this.jsonFile;

      const routes = this.getRoutes();
      let method;

      routes.map( (routeI)=> {
        let route = routeI.split(' ');
        let wejsP = ((route.length > 1)? route[1]: route[0]);

        return {
          route: route,
          routeI: routeI,
          wejsP: wejsP,
          p: this.convertPathToSwaggerRoute(wejsP, we)
        };
      })
      .filter( (r)=> {
        if (r.p.indexOf('/admin') === 0) return false; // skip admin pages
        return true;
      })
      .forEach( (r)=> {
        const p = r.p,
          route = r.route,
          routeI = r.routeI,
          wejsP = r.wejsP;

        if (!jsonFile.paths[p]) jsonFile.paths[p] = {};


        if (methods.indexOf(route[0]) > -1) {
          method = route[0];
        } else {
          method = 'get';
        }

        let name = method+ '_' + we.routes[routeI].controller + '_' +we.routes[routeI].action;


        if (we.routes[routeI].parent) {
          name = we.routes[routeI].parent+ '_' + name;
        }

        if (we.routes[routeI].name) {
          name = we.routes[routeI].name+ '_' + name;
        }

        name = method +'::' + p;

        jsonFile.paths[p][method] = {
          tags: [
            we.routes[routeI].controller
          ],
          operationId: name,
          parameters: this.getPathParams(wejsP, we, method, we.routes[routeI]),
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

            if (we.routes[routeI].action == 'create' && we.routes[routeI].model) {
              jsonFile.paths[p][method].responses['201'].schema = {
                '$ref': '#/definitions/'+we.routes[routeI].model
              };
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

            if (we.routes[routeI].action == 'edit' && we.routes[routeI].model) {
              jsonFile.paths[p][method].responses['200'].schema = {
                '$ref': '#/definitions/'+we.routes[routeI].model
              };
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

            if (we.routes[routeI].action == 'find', we.routes[routeI].model) {
              jsonFile.paths[p][method].responses['200'].schema = {
                type: 'array',
                items: {
                  '$ref': '#/definitions/'+we.routes[routeI].model
                }
              };
            } else if (we.routes[routeI].action == 'findOne', we.routes[routeI].model) {
              jsonFile.paths[p][method].responses['200'].schema = {
                '$ref': '#/definitions/'+we.routes[routeI].model
              };
            }
        }
      });

      jsonFile.paths['/swagger'] = { 'x-swagger-pipe': 'swagger_raw' };

      jsonFile.definitions = getSwaggerDefinitions(we);

      const filePath = path.join(os.tmpdir(), 'swaggerBase.json');
      fs.writeFile(filePath, JSON.stringify(jsonFile), (err)=> {
        if (err) return reject(err);
        resolve({
          base: filePath,
          data: jsonFile
        });
      })
    });
  },

  getStaticFileData() {
    const we = this.we,
      _ = we.utils._;

    const config = {
      swagger: '2.0',
      info: {
        version: ((this.packageJSON.version)? this.packageJSON.version: '0.0.1'),
        title: we.config.appName,
        description: ((this.packageJSON.description)? this.packageJSON.description: null),
        termsOfService: we.config.termsOfService
      },
      host: we.config.hostname.replace('http://','').replace('https://', ''),
      basePath: '/',
      schemes: [ 'http', 'https' ],
      consumes: ['application/json'],
      produces: we.config.responseTypes,

      paths: {},
      definitions: {},

      externalDocs: {
        description: 'We.js site and documentation',
        url: 'https://wejs.org'
      }
    };

    if (
      this.packageJSON.maintainers &&
      _.isArray(this.packageJSON.maintainers) &&
      this.packageJSON.maintainers[0]
    ) {
      // always use the first maintainer as contact:
      config.info.contact = this.packageJSON.maintainers[0];
    }

    // use package.json keywords as tags:
    if (
      this.packageJSON.keywords &&
      _.isArray(this.packageJSON.keywords)
    ) {
      config.tags = [];
      this.packageJSON.keywords.forEach((k)=> {
        config.tags.push({
          name: k
        });
      });
    }

    return config;
  },

  convertPathToSwaggerRoute (p) {
    const pParts = this.we.router.parseRouteToMap(p);

    return pParts.map( (part)=> {
      if (!part) return '';
      if (typeof part == 'object') {
        if (part.name.indexOf('Id') > -1) {
          return '{'+ this.parseParam(part) +'}';
        } else {
          return '{'+ this.parseParam(part) +'}';
        }
      }

      return part;
    })
    .join('/');
  },

  parseParam(pathPart) {
    let param = 'id';

    if (typeof pathPart == 'object' && pathPart.name) {
      param = pathPart.name.replace(':', '');
      if (param.indexOf('(') >-1) {
        param = ( param.split('(')[0] );
      }
    } else {
      console.log('unknow param:', pathPart);
    }

    return param;
  },

  getPathParams(p, we, method, configs) {
    const pParts = we.router.parseRouteToMap(p);
    let bodyParams = [], cfgs;

    let pathParams = pParts
    .filter(function(part) {
      if (!part) return false;
      if (typeof part != 'object') return false;
      return true;
    })
    .map( (part)=> {
      if (part.name.indexOf('Id') > -1) {

        var name = this.parseParam(part);
        var type = 'string';

        if (part.name.indexOf('([0-9]+)') >-1) type = 'integer';

        return {
          name: name,
          in: 'path',
          required: true,
          type: 'integer'
        };
      } else {
        return {
          name: ( this.parseParam(part) ),
          in: 'path',
          required: true,
          type: 'integer'
        };
      }
    });


    if ( (method == 'post' || method == 'put') && configs.model) {
      cfgs = {
        name: configs.model,
        in: 'body',
        description: configs.action+' '+configs.model,
        required: true
      };

      if (configs.model) {
        cfgs.schema = { '$ref': '#/definitions/' + configs.model };
      }

      bodyParams.push(cfgs);
    }

    return pathParams.concat(bodyParams);
  },

  setRouteCommentsData(jsonFilePath, jsonFile, ctx, commentName, method) {
    // this route dont have comments in controller:
    if (!ctx.commentActions[commentName]) return;

    const ca = ctx.commentActions[commentName];
    // route description:
    if (ca.description) {
      jsonFilePath[method].description = ca.description;
    }

    if (ca.apiParams) {
      // set base paramters array:
      if (!jsonFilePath[method].parameters) {
        jsonFilePath[method].parameters = [];
      }

     ca.apiParams.forEach( (param)=> {
        const data = {
          in: 'query',
          required: false
        };

        if (param.name) {
          data.name = param.name;
        } else {
          // name is required:
          return;
        }

        if (param.type) {
          data.type = param.type.toLowerCase();
        }

        if (param.description) {
          data.description = param.description;
        }

        jsonFilePath[method].parameters.push(data);

      });
    }

  }
};

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
    let attrNames = Object.keys(mcd.definition);

    attrNames.forEach(function (mcdna) {
      if (mcdna == 'metadata') return;
      // mysql enum fields return error here, dont use it enum ...
      try {
        if (String(mcd.definition[mcdna].type) == 'VIRTUAL') return;
      } catch (e) {
        return;
      }

      definitions[mcd.name].properties[mcdna] = {
        type: resolveModelAttrType(mcd.definition[mcdna].type)
      };

    });
  });

  return definitions;
}

function resolveModelAttrType(attr) {
  let attrS = String(attr);

  if ( (attrS.indexOf('VAR') > -1) || (attrS.indexOf('TEX')  > -1)) {
    return 'string';
  }

  if ( (attrS.indexOf('INT') >-1) || (attrS.indexOf('NUM') > -1)) {
    return 'number';
  }

  if (attrS.indexOf('BOO')) {
    return 'boolean';
  }

  return 'string';
}

module.exports = DocBuilder;