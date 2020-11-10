const passport = require('passport')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const expressSession = require('express-session')
const bcrypt = require('bcryptjs');

var LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

module.exports = (app) => {
  // Passport
  app.use(cookieParser());
  // app.use(bodyParser());
  app.use(expressSession({
    secret: 'bonsecret',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());	// Required for persistent login sessions (optional, but recommended)

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    console.log('bon strategy')
    console.log(`${username} => ${password}`)
    User.findOne({ Username: username }).exec().then(user => {
      if (!user) return done(null, false, { message: 'user not exists' })
      if (!bcrypt.compareSync(password, user.Password)) {
        return done(null, false, { message: 'password incorrect' })
      }
      done()
    })
  }))
  passport.serializeUser((user, done) => {
    done(null, user._id);
  })
  passport.deserializeUser((id, done) => {
    User.findById(id).exec().then(user => {
      done(null, user)
    }).catch(err => {
      console.log(err)
      done(err, null)
    })
  })
}