const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Access denied. Invalid token.' });
      }
  
      req.user = user;
      next();
    });
  }

  module.exports = {
    authenticateToken,
  };
  