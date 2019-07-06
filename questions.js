module.exports = function() {
  let prompts = [];

  if (!this.options.name) {
    prompts.push({
      type    : 'input',
      name    : 'name',
      message : 'Project name',
      default : (this.options.name || this.options.appname) // Default to current folder name
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
};

function createFirstUser (answers) {
  return (answers.createFirstUser && (answers.createFirstUser == 'yes'));
}
