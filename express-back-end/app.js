const express = require('express');
const app = express();

require('./src/configs/middleware')(app);
require('./src/configs/database');

app.use('/api', require('./src/routes'));

require('./src/configs/error')(app);

module.exports = app;