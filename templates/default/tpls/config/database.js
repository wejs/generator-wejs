/**
 * Database and session configuration
 */

let configs = {
  database: {
    prod: {
      uri: process.env.DATABASE_URL,
      // mysql configuration for "complex" texts
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    dev: {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      // mysql configuration for "complex" texts
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    test: {
      dialect: 'sqlite',
      storage: 'database-test.sqlite',
    }
  }
};

if (process.env.REDIS_URL) {
  const session = require('express-session');
  const RedisStore = require('connect-redis')(session);
  const redis = require('redis');

  // change host and port to your redis cfgs:

  //CREATE REDIS CLIENT
  const redisClient = redis.createClient({
    // [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
    url: process.env.REDIS_URL
  });

  // redis client error handler:
  redisClient.on('error', function (err) {
    console.log('REDIS Error > ' + err);
  });

  configs.session = {
    secret: (
      process.env.SESSION_SECRET ||
      process.env.REDIS_SECRET ||
      '<%= appConfigs.randomString %>'
    ),
    store: new RedisStore({
      // pass the session store settings, see the session store docs
      client: redisClient,
      url: process.env.REDIS_URL,
      ttl: 31557600, // 1 year, this is set by secconds
      db: Number(process.env.REDIS_DB) || 1
    }),
    resave: false, // don't save session if unmodified
    saveUninitialized: false
  }

} else if (process.env.NODE_ENV != 'production') {
  const session = require('express-session');
  const SQLiteStore = require('connect-sqlite3')(session);

  configs.session = {
    secret: (
      process.env.SESSION_SECRET ||
      '<%= appConfigs.randomString %>'
    ),
    store: new SQLiteStore({
      table: 'ssessions',
      db: 'sessions.sqlite',
      dir: process.cwd()
    }),
    resave: false, // don't save session if unmodified
    saveUninitialized: false
  };
} else {
  configs.session = null;
}

module.exports = configs;