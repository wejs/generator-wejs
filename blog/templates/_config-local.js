/**
 * Example local environment settings
 *
 * Copy to local.js and set your configs
 *
 */

module.exports = {
  appName: 'We blog',

  port: '<%= appConfigs.port %>',
  hostname: '<%= appConfigs.hostname %>',

  email: {
    fromName: '<%= appConfigs.title %>',
    siteEmail: '<%= appConfigs.appemail %>'
  },

  passport: {
    cookieDomain : null
  },

  acl: {
    disabled: false
  },

  database: {
    dev: {
      dialect: 'mysql',
      database: '<%= appConfigs.databasename %>',
      username: '<%= appConfigs.databaseuser %>',
      password: '<%= appConfigs.databasepassword %>'
    }
  }
};