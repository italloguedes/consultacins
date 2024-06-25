const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
};

module.exports = { requireAuth };
