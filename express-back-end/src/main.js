var express = require('express');
const app = express();

// var cors = require('cors');
const bodyParser = require('body-parser');
// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

var config = require('./config');
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

var Model = require('./schema');
var Thread = Model.Thread;
var User = Model.User;


app.get('/init', (req, res) => {
  const userNumberRand = Math.random();
  const num = Math.floor(Math.random() * 10) + 1;
  var newUser = new User({
    userName: "testUser" + userNumberRand,
    userPassword: "password"
  });
  newUser.save().then(currentUser => {
    var _posterId = mongoose.mongo.ObjectId(currentUser._id);
    const threadCount = num % 10;
    console.log(`${newUser.userName} posted ${threadCount} thread(s)`);
    for (let i = 0; i < threadCount; i++) {
      var newThread = new Thread({
        threadTitle: `Title ${num} part${i + 1}/${threadCount}`,
        threadPoster: currentUser._id.str,
        content: `Content ${num}`,
        published: {
          date: "Date",
          time: "Time"
        },
        upVote: 0,
        downVote: 0
      });

      newThread.save().then(newThread => {
        var _threadId = newThread._id;
        User.findById(_posterId).exec().then(user => {
          user.userThread.push(_threadId);
          user.save().then(updatedUser => {
            if (i === threadCount - 1) {
              User.findById(new mongoose.Types.ObjectId(updatedUser._id)).exec().then(x => {
                console.log(x);
                res.status(200).json(x);
              }).catch(err => {
                console.log(err);
              });
              return;
            }
          });
        });
      });
    }
  });
});

app.get('/threads', (req, res) => {
  console.log('THREAD');
  Thread.find().exec((err, data) => {
    if (err) res.status(400).send(err);
    else res.status(200).send(data);
  });
});
app.get('/users', (req, res) => {
  console.log('USER');
  User.find().exec((err, data) => {
    if (err) res.status(400).send(err);
    else res.status(200).send(data);
  });
});

app.use((req, res, next) => {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  })
})

var port = 5000;
app.listen(port, () => console.log("API is running on " + port));