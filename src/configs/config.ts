import process from 'process'

const env = process.env

export const config = {
  dbConnection: env.DB_CONNECTION,

  secretKey: env.SECRET,
}
