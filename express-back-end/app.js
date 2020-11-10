const express = require('express');
const app = express();
const path = require("path");

require('./src/configs/database');
require('./src/middleware')(app);

app.use('/api', require('./src/routes'));

require('./src/middleware/error-handler')

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app;