import { config } from './config'
import mongoose from 'mongoose'

// mongoose.Promise = global.Promise;

export const initDatabase = () => {
  const username = config.username
  const password = config.password
  const cluster = config.cluster
  const database = config.database

  const connString = `mongodb+srv://${username}:${password}@${cluster}.sjs10.gcp.mongodb.net/${database}?retryWrites=true&w=majority`

  mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("Connected to the database " + database)
  },
    error => {
      console.log("Connection failed: " + error)
      process.exit();
    }
  );
}
