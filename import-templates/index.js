/**
 * We.js generator to copy plugin templates to theme
 */

const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  path = require('path'),
  utils = require('../utils');

let we;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    we = utils.getWe();

    this.doneAll = function doneAll(err) {
      if ( err ) we.log.error('Error:', err);
      we.exit(process.exit);
    };
  }

  prompting() {
    this.log(yosay(
      'Import all plugin templates to theme'
    ));

    return new Promise( (resolve, reject)=> {
      we.bootstrap( (err)=> {
        if (err) return reject(err);

        const prompts = [];

        prompts.push({
          type: 'list',
          name    : 'themeSelected',
          message : 'Select theme for receive all templates',
          choices: Object.keys(we.view.themes)
        });

        return this.prompt(prompts)
        .then( (props)=> {

          this.themeSelected = props.themeSelected;
          this.themeFolder = path.join(
            we.view
              .themes[ props.themeSelected ]
              .config.themeFolder,
            'templates/server'
          );

          this.sourceRoot( this.themeFolder );
        })
        .then(resolve)
        .catch(reject);

      });
    });
  }

  writeFiles() {
    let themeNames = Object.keys(we.view.themes);
    let pluginTemplates = {};
    let allTemplates = we.view.configuration.templates;

    for(let name in allTemplates) {
      let isThemeTemplate = checkIfIsThemeTemplate(name, themeNames);

      if (isThemeTemplate) {
        continue; // skip theme templates
      }

      pluginTemplates[name] = allTemplates[name];
    }

    for (let name in pluginTemplates) {
      this.fs.copy(
        pluginTemplates[name],
        this.destinationPath( path.join(this.themeFolder, name+'.hbs') )
      );
    }
  }

  end() {
    this.log('DONE');
    return this.doneAll();
  }
};

function checkIfIsThemeTemplate(name, themeNames) {
  for (let i = 0; i < themeNames.length; i++) {
    if (name.startsWith( themeNames[0] )) {
      return true;
    }
  }
  return  false;
}