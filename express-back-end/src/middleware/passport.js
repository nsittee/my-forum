const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function initialize(passport, getUserByUsername, getUserById) {
  passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password',
    session: true,
  }, (username, password, done) => {
    getUserByUsername(username).then(user => {
      console.log(user)
      if (user == null) {
        console.log('User not exists')
        return done(null, false, { message: 'No user with that username' })
      }
      try {
        if (bcrypt.compareSync(password, user.Password)) {
          return done(null, user)
        } else {
          console.log(`incorrect password`)
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        console.log(e)
        console.log('error')
        return done(e)
      }
    })

  }))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize