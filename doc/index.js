const Generator = require('yeoman-generator'),
  yosay = require('yosay'),
  DocBuilder = require('../lib/DocBuilder'),
  utils = require('../utils');

let we;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
        this.templatePath('swagger.yaml'),
        this.destinationPath('doc/api/swagger.yaml'),
        { ymlText: self.ymlText }
      );

      this.fs.copyTpl(
        this.templatePath('swagger.json'),
        this.destinationPath('doc/api/swagger.json'),
        { jsonText: self.jsonText }
      );
      return null;
    })
    .then(done)
    .catch(this.doneAll);
  }

  writing() {
    this.fs.copy(
      this.templatePath('html'),
      this.destinationPath('doc/api/html')
    );
  }

  end() {
    this.doneAll();
  }
};