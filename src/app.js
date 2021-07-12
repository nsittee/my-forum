const express = require('express');
const app = express();
const path = require("path");

require('./middleware')(app);
require('./configs/database');

app.use('/api', require('./routes'));

require('./middleware/error-handler');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get("/*", (req, res) => {
  if (process.NODE_ENV == "production") {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  } else {
    res.send('Api is running');
  }
});

module.exports = app;