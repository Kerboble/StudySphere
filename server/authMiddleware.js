// authMiddleware.js
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const autHeader = req.headers['authorization'];
  const token = autHeader && autHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send('You do not have a token');
  }

  jwt.verify(token, 'secret_value', (error, user) => {
    if (error) {
      return res.status(403).send('You have a token, however it is expired');
    }
    
    req.user = user;
    next();
  });
}

module.exports = authToken;
