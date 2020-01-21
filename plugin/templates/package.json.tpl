{
  "name": "<%= pluginName %>",
  "description": "We.js <%= pluginName %> plugin",
  "version": "0.0.0",
  "main": "plugin.js",
  "scripts": {
    "test": "NODE_ENV=test LOG_LV=info ./node_modules/.bin/mocha test/bootstrap.js test/**/*.test.js",
    "coverage": "NODE_ENV=test LOG_LV=info nyc mocha test/bootstrap.js test/**/*.test.js -b"
  },
  "devDependencies": {
    "chance": "^1.1.4",
    "connect-sqlite3": "^0.9.11",
    "fs-extra": "^8.1.0",
    "istanbul": "0.4.5",
    "mocha": "7.0.0",
    "nyc": "^15.0.0",
    "rimraf": "^3.0.0",
    "sinon": "8.1.0",
    "sqlite3": "^4.1.1",
    "supertest": "4.0.2",
    "we-core": "^3.1.8",
    "we-plugin-acl": "^1.2.16",
    "we-plugin-auth": "^2.3.2",
    "we-plugin-user": "^3.0.1",
    "we-test-tools": "^1.0.0"
  },
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
