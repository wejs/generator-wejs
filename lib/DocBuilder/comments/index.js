const comments = require('js-comments'),
  path = require('path'),
  fs = require('fs');

module.exports = {
  loadAllCommentsActions(we) {
    const async = we.utils.async;
    this.we = we;

    return new Promise ( (resolve, reject)=> {
      let controllerFiles = [];

      async.eachSeries(we.pluginNames, (pluginName, next)=> {
        const plugin = we.plugins[pluginName];

        // controllers:
        we.utils.listFilesRecursive(plugin.controllersPath, (err, jsFiles) => {

          let files = jsFiles.filter((file)=> {
            return (file.endsWith('.js'));
          });

          // add plugin.js file:
          files.push( path.join(plugin.pluginPath, 'plugin.js') );

          controllerFiles = controllerFiles.concat(files);

          next();
        });
      }, (err)=> {
        if (err) return reject(err);

        resolve(controllerFiles);
      });

      // load plugin comments
        // list plugin controllers
        //


      // load project comments
        // list project controllers
    })
    .then( (files)=> {
      return this.readControllerComments(files);
    });
  },

  readControllerComments(files) {

    return new Promise ( (resolve, reject)=> {
      let actions = {};

      this.we.utils.async.eachSeries(files, (file, next)=> {

        this.readControllerActionComments(file, actions, ()=> {
          next();
        });
      }, (err)=> {
        if (err) return reject(err);
         resolve(actions);
      });
    });
  },

  readControllerActionComments(controllerPath, actions, cb) {
    let str = fs.readFileSync(controllerPath, 'utf8'),
      c = [];

    try {
      c = comments.parse(str, {});
    } catch(e) {
      // console.log('Error on parse controller:', controllerPath, e);
    }

    // Get each action in the controller:
    c.forEach( (action)=> {
      if (action && action.apiName) {
        // cleanup description:
        if (action.description) {
          if (action.description.indexOf('\n\n') === 0) {
            action.description = action.description.replace('\n\n', '');
          }
        }
        // save the unique comment:
        actions[action.apiName] = action;
      }
    });

    cb();
  }
};