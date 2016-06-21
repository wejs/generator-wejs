module.exports = function() {

  // {
  //   type: 'input',
  //   name: 'favorite',
  //   message: 'Bacon lover, what is your favorite type of bacon?',
  //   when: function (answers) {
  //     return answers.bacon;
  //   }
  // },

  var prompts = [];

  if (!this.name) {
    prompts.push({
      type    : 'input',
      name    : 'name',
      message : 'Your app name',
      default : (this.name || this.appname) // Default to current folder name
    });
  }

  if (!this.options.dbDialect) {
    prompts.push({
      type: 'list',
      name: 'dbDialect',
      message: 'Choice one database for your project',
      choices: ['mysql', 'postgres']
    });
  }

  if (!this.options.dbName) {
    prompts.push({
      type    : 'input',
      name    : 'dbName',
      message : 'Database name',
      default : 'test'
    });
  }

  if (!this.options.dbUsername) {
    prompts.push({
      type    : 'input',
      name    : 'dbUsername',
      message : 'Database user name',
      default : 'root'
    });
  }

  if (!this.options.dbPassword) {
    prompts.push({
      type    : 'password',
      name    : 'dbPassword',
      message : 'Database password',
      default : ''
    });
  }

  if (!this.options.notCreateFirstUser) {
    prompts.push({
      type    : 'list',
      name    : 'createFirstUser',
      message : 'Create the first user?',
      choices: ['yes', 'no']
    });
  }

  if (!this.options.userName) {
    prompts.push({
      type    : 'input',
      name    : 'userName',
      message : 'User name',
      default : 'admin',
      required: true,
      when: createFirstUser
    });
  }

  if (!this.options.userEmail) {
    prompts.push({
      type    : 'input',
      name    : 'userEmail',
      message : 'User email',
      default : 'admin@example.com',
      required: true,
      when: createFirstUser
    });
  }

  if (!this.options.userPassword) {
    prompts.push({
      type    : 'password',
      name    : 'userPassword',
      message : 'User password',
      default : '123',
      required: true,
      when: createFirstUser
    });
  }

  if (!this.options.userDisplayName) {
    prompts.push({
      type    : 'input',
      name    : 'userDisplayName',
      message : 'User display name',
      default : 'Administrator',
      required: true,
      when: createFirstUser
    });
  }


  return prompts;
}


function createFirstUser (answers) {
  return (answers.createFirstUser && (answers.createFirstUser == 'yes'));
}