const jwt = require('jsonwebtoken');
const config = require('../configs/config');
module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, config.secretKey)
    console.log(decoded)
    // TODO: check if the session is valid and the user exists in database
    console.log(req.body.Thread)
  } catch {
    return res.status(401).json({
      message: "auth failed",
    });
  }
  next();
}