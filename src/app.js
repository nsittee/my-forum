const express = require('express');
const app = express();
const path = require("path");

require('./middleware')(app);
require('./configs/database');

app.use('/api', require('./routes'));

require('./middleware/error-handler');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;