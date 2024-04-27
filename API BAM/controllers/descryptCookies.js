const { decryptCookie } = require('./userController');

const decryptCookies = (req, res, next) => {
  const encryptedToken = req.cookies.token;
  const encryptedRole = req.cookies.role;

  if (encryptedToken && encryptedRole) {
    try {
      req.token = decryptCookie(encryptedToken);
      req.role = decryptCookie(encryptedRole);
    } catch (err) {
      // Manejar errores de descifrado
      return res.status(401).json({ error: 'Invalid or tampered cookies' });
    }
  }

  next();
};

module.exports = decryptCookies;
