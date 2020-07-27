const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {

  // Connect MongoDB
  require('../configs/database');

  // CORS
  app.use(cors())

  // Parser Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logger
  app.use(morgan('dev'))

  // Passport
  // require('../configs/passport');

  // Static file
  // app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  // app.use(require('../configs/responseFormat'))

}