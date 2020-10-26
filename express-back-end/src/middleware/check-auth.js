const jwt = require('jsonwebtoken');
const config = require('../configs/config');
module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, config.secretKey);
    console.log(req.body.Thread)
  } catch {
    return res.status(401).json({
      message: "auth failed",
    });
  }
  next();
}