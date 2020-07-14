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
    // _id: mongoose.Types.ObjectId,
    userName: "testUser" + userNumberRand,
    userPassword: "password"
  });
  newUser.save().then(currentUser => {
    var _posterId = mongoose.mongo.ObjectId(currentUser._id);
    const threadCount = num % 10;
    console.log(`${newUser.userName} posted ${threadCount} thread(s)`);
    for (let i = 0; i < threadCount; i++) {
      const upVoteCount = Math.floor(Math.random() * 1000) + 1;
      const downVoteCount = Math.floor(Math.random() * 1000) + 1;
      var newThread = new Thread({
        // _id: mongoose.Types.ObjectId,
        threadTitle: `The story of ${newUser.userName}: Part ${i + 1}/${threadCount}`,
        threadPoster: currentUser._id,
        content: `Content ${num}`,
        published: {
          date: "Date",
          time: "Time"
        },
        upVote: upVoteCount,
        downVote: downVoteCount
      });

      newThread.save().then(newThread => {
        var _threadId = newThread._id;
        User.findById(_posterId).exec().then(user => {
          user.userThread.push(_threadId);
          user.save().then(updatedUser => {
            if (i === threadCount - 1) {
              User.findById(new mongoose.Types.ObjectId(updatedUser._id)).exec().then(x => {
                console.log(x);
                return res.status(200).json(x);
              }).catch(err => {
                console.log(err);
              });
            }
          });
        });
      });
    }
  });
});

app.get('/threads', (req, res) => {
  Thread.find().exec().then(threads => {
    res.status(200).json(threads);
  });
});
app.get('/users', (req, res) => {
  User.find().exec().then(users => {
    res.status(200).json(users);
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