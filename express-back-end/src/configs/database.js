const config = require('./config')
const mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
const username = config.username
const password = config.password
const cluster = config.cluster
const database = config.database

const connString = `mongodb+srv://${username}:${password}@${cluster}.sjs10.gcp.mongodb.net/${database}?authSource=admin&replicaSet=atlas-8jv0cx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
    console.log("Connected to the database ")

  },
  error => {
    console.log("Connection failed: " + error)
    process.exit();
  }
);