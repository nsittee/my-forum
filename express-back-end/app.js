const express = require('express');
const app = express();
const path = require("path");

require('./src/middleware')(app);
require('./src/configs/database');

app.use('/api', require('./src/routes'));

require('./src/middleware/error-handler')

app.use(express.static('public'))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app;