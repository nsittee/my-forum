const express = require('express');
const morgan = require('morgan');
const passport = require('passport')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const expressSession = require('express-session')

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
  app.use(cookieParser());
  // app.use(bodyParser());
  app.use(expressSession({
    secret: 'bonsecret',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());	// Required for persistent login sessions (optional, but recommended)
  // Passport


  // Static file
  // app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  // app.use(require('../configs/responseFormat'))
}