const jwt = require('jsonwebtoken');

require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Si el token es inválido, se devuelve un código de estado 403 Forbidden
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' });
      } else {
        return res.status(403).json({ error: 'Failed to authenticate token' });
      }
    }

    // Si el token es válido, se guarda la información del usuario en req.user
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
