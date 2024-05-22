require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const csrf = require('csurf');
const cors = require('cors');
const idAutoIncrement = require('mongoose-id-autoincrement');
const passport = require('passport');
const errorMiddleware = require('./middleware/errorMiddleware');
const csrfErrorHandler = require('./middleware/csrfErrorHandler');
const rateLimit = require('express-rate-limit'); // Importar express-rate-limit
const helmet = require('helmet'); // Importar helmet
const app = express();

// Middleware para cookies
app.use(cookieParser());

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Permitir cookies en las solicitudes CORS
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware para inicializar Passport
app.use(passport.initialize());

// Middleware para CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Middleware para manejar errores de CSRF
app.use(csrfErrorHandler);

// Middleware para manejar otros errores
app.use(errorMiddleware);

// Middleware para Helmet
app.use(helmet());

// Configuración de CSP usando Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Permitir estilos en línea (ajustar según tus necesidades)
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "http://localhost:3000"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Construcción de la URI de conexión a MongoDB
const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`;

// Intento de conexión a MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    // Inicializar el plugin de autoincremento después de que la conexión sea exitosa
    idAutoIncrement.initialize(mongoose.connection);
  })
  .catch((err) => console.log('MongoDB connection error:', err));

// Configuración de Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por ventana de tiempo
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Aplicar el rate limiting a todas las rutas de la API
app.use('/api/', apiLimiter);

// Importar rutas después de configurar el middleware
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookRoutes = require('./routes/booksRoutes');

// Usa las rutas importadas
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);

// Ruta para obtener el token CSRF
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World! The MongoDB connection was successful.');
});

// Escucha en el puerto definido en .env o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
