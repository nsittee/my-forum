var express = require('express');
const app = express();

require('./src/configs/middleware')(app);
require('./src/configs/database');

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

module.exports = app;