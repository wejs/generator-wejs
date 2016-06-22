module.exports.database = {
  prod: {
    uri: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres'
  },
  dev: {
    uri: process.env.DATABASE_URL,
    // uri: 'mysql://localhost:3306/test',
    dialect: 'postgres',
    protocol: 'postgres'
  },
  test: {
    dialect: 'mysql',
    database: 'test',
    username: 'root',
    password: ''
  }
}
