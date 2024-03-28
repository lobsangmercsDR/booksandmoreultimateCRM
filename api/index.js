const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();


const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
