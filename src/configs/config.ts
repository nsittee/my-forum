import process from 'process'

const env = process.env

export const config = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  cluster: env.DB_CLUSTER,
  database: env.DB_DATABASE,

  secretKey: env.SECRET,
}
