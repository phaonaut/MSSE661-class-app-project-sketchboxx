const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config.js');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied.');
  };

  try {
    const verified = jwt.verify(token, jwtConfig.secret); // { id: 12344, iat: 123123 }
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token.');
  }
}