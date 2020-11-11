const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const User = require('../models/user')
const passport = require('passport')
const initializePassport = require('./passport');
initializePassport(
  passport,
  username => User.findOne(
    { Username: username },
    { '_id': 1, 'Username': 1, 'Password': 1 }
  ).exec().then(user => { return user }),
  id => User.findOne(
    { _id: id },
    { '_id': 1, 'Username': 1, 'Password': 1 }
  ).exec().then(user => { return user })
)

module.exports = (app) => {

  // Connect MongoDB
  require('../configs/database');

  // CORS
  app.use(cors());

  // Parser Body
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // Logger
  app.use(morgan('dev'));

  // Passport
  const
    session = require("express-session"),
    bodyParser = require("body-parser")
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(session({
    secret: require('../configs/config').secretKey,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.post('/x/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  }))

  // Static file
  // app.use('/static', express.static(path.join(__dirname, '../public')))
  app.use(express.static('public'))

  // Custom Response Format
  // app.use(require('../configs/responseFormat'))
}