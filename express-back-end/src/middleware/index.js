const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {

  // Connect MongoDB
  require('../configs/database');

  // CORS
  app.use(cors());

  // Parser Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logger
  app.use(morgan('dev'));

  // Passport
  require('./passport')(app)

  // Static file
  // app.use('/static', express.static(path.join(__dirname, '../public')))
  app.use(express.static('public'))

  // Custom Response Format
  // app.use(require('../configs/responseFormat'))
}