const csurf = require('csurf');

// Configura el middleware CSRF
const csrfProtection = csurf({
  cookie: true // Usa cookies para almacenar el token CSRF
});

module.exports = csrfProtection;
