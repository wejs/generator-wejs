{
  "name": "<%= pluginName %>",
  "description": "We.js <%= pluginName %> plugin",
  "version": "0.0.0",
  "main": "plugin.js",
  "scripts": {
    "test": "NODE_ENV=test LOG_LV=info ./node_modules/.bin/mocha test/bootstrap.js test/**/*.test.js",
    "coverage": "NODE_ENV=test LOG_LV=info nyc mocha test/bootstrap.js test/**/*.test.js -b"
  },
  "devDependencies": {},
  "keywords": [
    "wejs-plugin"
  ],
  "repository": "",
  "license": "MIT",
  "author": "Someone <conact@someone.com>",
  "wejs": {
    "dependencies": {
      "we-plugin-acl": true,
      "we-plugin-auth": true,
      "we-plugin-user": true
    },
    "plugins": {
      "we-plugin-acl": true,
      "we-plugin-auth": true,
      "we-plugin-user": true
    }
  }
}
