var express = require('express');
const app = express();

var cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

require('./src/configs/database');

const ThreadModel = require('./src/models/thread');
const UserModel = require('./src/models/user');

const threadRoutes = require('./src/routes/thread');
const userRoutes = require('./src/routes/user');
const utilRoutes = require('./src/routes/util');
app.use('/api/threads', threadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/util', utilRoutes);

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