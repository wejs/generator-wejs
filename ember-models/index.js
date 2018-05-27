/**
 * We.js yeoman ember.js model generator based in project models
 */

const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  fs = require('fs'),
  conversor = require('./conversor'),
  utils = require('../utils');

let we;

const modelsToSkip = [
  'password',
  'passport',
  'comment',
  'menu',
  'slide',
  'user',
  'email-template',
  'sitecontact-form',
  'term',
  'vocabulary',
  'link',
  'sitecontact',
  'url-alia'
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('dest', { type: String, required: true });

    we = utils.getWe();

    this.doneAll = function doneAll(err) {
      if ( err ) we.log.error('Error:', err);
      we.exit(process.exit);
    };
  }

  prompting() {
    this.log(yosay(
      'We.js ember.js models generator! |o/'
    ));
  }

  bootstrapApp() {
    const done = this.async();
    we.bootstrap( (err)=> {
      if (err) return done(err);

      if (
        !fs.existsSync(this.options.dest) ||
        !fs.existsSync(this.options.dest+'/app/models')
      ) {
        return done('invalid ember.js project path');
      }

      done();
    });
  }

  writeFiles() {
    let destFolder = this.options.dest+'/app/models/';
    const models = we.db.models;

    for (let modelName in models) {
      if (modelsToSkip.indexOf(modelName) >-1) continue;

      let fieldsText = conversor.convertFields(we, modelName);

      this.fs.copyTpl(
        this.templatePath('model.js.ejs'),
        destFolder+modelName+'.js',
        {
          fields: fieldsText,
          modelName: modelName
        }
      );
    }
  }

  end() {
    process.exit(0);
  }
};