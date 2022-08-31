const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors')
require('dotenv').config();

// PORT
const PORT = process.env.PORT;

// Crear el servidor de express
const app = express();

// Conección base de datos
dbConnection();

// CORS
app.use(cors())

// Lectura y parseo del body
app.use( express.json() );

// Directorio publico
app.use( express.static('public') );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));






// Escuchar peticiones
app.listen( PORT , () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})