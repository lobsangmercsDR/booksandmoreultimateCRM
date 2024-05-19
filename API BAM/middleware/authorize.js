const authorize = (roles = []) => {
  // roles puede ser un solo rol o un array de roles
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden. You do not have permission to perform this action.' });
    }
    next();
  };
};

module.exports = authorize;
