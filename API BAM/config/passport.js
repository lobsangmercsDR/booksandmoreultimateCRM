const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email', // Campo del formulario que contiene el correo electrónico
    passwordField: 'password' // Campo del formulario que contiene la contraseña
}, async (email, password, done) => {
    try {
        // Buscar al usuario por su correo electrónico en la base de datos
        const user = await User.findOne({ email });

        // Si no se encuentra al usuario, devolver un mensaje de error
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, devolver un mensaje de error
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // Si el usuario y la contraseña son válidos, devolver el usuario autenticado
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serializar el usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar el usuario almacenado en la sesión
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
