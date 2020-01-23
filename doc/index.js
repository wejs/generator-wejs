const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  path = require('path'),
  DocBuilder = require('../lib/DocBuilder'),
  utils = require('../utils');

let we;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRoot(path.resolve(__dirname, '../templates/doc'));

    this.argument('name', { type: String, required: false });

    we = utils.getWe();

    this.doneAll = function doneAll(err) {
      if ( err ) we.log.error('Error:', err);
      we.exit(process.exit);
    };
  }

  prompting() {
    this.log(yosay(
      'Swagger documentation generator!'
    ));
  }

  bootstrapApp() {
    const done = this.async();
    we.bootstrap(done);
  }

  buildProjectDocumentation() {
    const done = this.async(),
      self = this;

    this.log('method 1 just ran');

    let docB = new DocBuilder(we);

    docB.generate()
    .then((r)=> {
      // write the files:
      self.ymlText = r.ymlText;
      self.jsonText = r.jsonText;

      this.fs.copyTpl(
        this.templatePath('tpls/swagger.yaml'),
        this.destinationPath('doc/api/swagger.yaml'),
        { ymlText: self.ymlText }
      );

      this.fs.copyTpl(
        this.templatePath('tpls/swagger.json'),
        this.destinationPath('doc/api/swagger.json'),
        { jsonText: self.jsonText }
      );
    })
    .then(done)
    .catch(this.doneAll);
  }

  writing() {
    this.fs.copy(
      this.templatePath('files-to-copy'),
      this.destinationPath('doc/api/html'),
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );

    this.fs.copyTpl(
      this.templatePath('tpls/index.html'),
      this.destinationPath('doc/api/html/index.html'),
      { jsonText: this.jsonText }
    );

  }

  end() {
    this.doneAll();
  }
};