import { config } from './config'
import mongoose from 'mongoose'

// mongoose.Promise = global.Promise;

export const initDatabase = () => {
  const connString = config.dbConnection

  mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("Connected to the database")
  },
    error => {
      console.log("Connection failed: " + error)
      process.exit();
    }
  );
}
