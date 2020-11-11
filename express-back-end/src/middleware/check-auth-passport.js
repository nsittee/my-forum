function checkAuthenticated(req, res, next) {
  // console.log(req)
  if (req.isAuthenticated()) {
    console.log('auth needed for this page')
    return next()
  }

  res.redirect('/x')
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('auth not need for this page')
    return res.redirect('/y')
  }
  next()
}

module.exports = {
  isAuth: checkAuthenticated,
  isNotAuth: checkNotAuthenticated
}