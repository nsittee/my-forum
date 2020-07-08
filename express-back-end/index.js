var config = require('./config');
var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");

var mongo_uri = "mongodb+srv://" + config.username + ":" + config.password + "@cluster-bon.sjs10.gcp.mongodb.net/" + config.dbname + "?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("[success] task 2 : connected to the database ");
},
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

app.get("/", (req, res) => {
  res.status(200).send("Hi");
});

var Thread = require("./threadrouter");
app.use("/api/thread", Thread);

app.use((req, res, next) => {
  var err = new Error("not found");
  err.status = 404;
  next(err);
});