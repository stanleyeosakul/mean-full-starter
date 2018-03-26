const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {

  // Get token from the authorization header
  let token = req.headers.authorization;

  // Check for existing JWT
  if (token) {
    jwt.verify(token, keys.JWT.secret, function(err, decoded) {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate JWT' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ success: false, message: 'No JWT provided' });
  }
  
}