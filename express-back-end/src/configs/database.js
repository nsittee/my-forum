var config = require('../config');
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect(config.connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    console.log("Connected to the database ");
  },
  error => {
    console.log("Connection failed: " + error);
    process.exit();
  }
);