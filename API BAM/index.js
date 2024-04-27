require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const idAutoIncrement = require('mongoose-id-autoincrement');
const passport = require('passport');
const cors = require('cors'); // Importar cors
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const decryptCookies = require('./controllers/descryptCookies')
const app = express();

// Middleware para cookies
app.use(cookieParser());
app.use(decryptCookies);

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());

// Middleware para CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,

};
app.use(cors(corsOptions)); // Habilitar CORS para todas las rutas

// Middleware para inicializar Passport
app.use(passport.initialize());

// Middleware para manejar errores
app.use(errorMiddleware);

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

// Importar rutas después de configurar el middleware
const userRoutes = require('./routes/userRoutes');

// Usa las rutas importadas
app.use('/api/users', userRoutes); // Prefijo las rutas con '/api/users'

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World! The MongoDB connection was successful.');
});

// Escucha en el puerto definido en .env o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
