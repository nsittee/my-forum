const jwt = require('jsonwebtoken');
const config = require('../configs/config');
module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, config.secretKey);
    req.userData = decoded;
  } catch{
    return res.status(401).json({
      message: "auth failed",
    });
  }
  next();
}