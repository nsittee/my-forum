const env = require('process').env;

module.exports = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  cluster: env.DB_CLUSTER,
  database: env.DB_DATABASE,

  secretKey: env.SECRET,
}