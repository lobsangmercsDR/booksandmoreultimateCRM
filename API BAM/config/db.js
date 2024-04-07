const mongoose = require('mongoose');
const idAutoIncrement = require('mongoose-id-autoincrement');

// Asumiendo que has establecido MONGO_URI en tus variables de entorno
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');

  // Aplicar el plugin de auto incremento a nivel global
  mongoose.plugin(idAutoIncrement);
}).catch(err => console.log(err));
