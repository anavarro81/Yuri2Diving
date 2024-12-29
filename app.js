const  express = require('express');
const morgan = require('morgan')
const clienteRoutes = require('./src/routes/clientes.route')
const servicesRoutes = require('./src/routes/services.route')
const ratesRoutes = require('./src/routes/rates.route')

const multer = require('multer');
const AWS = require('aws-sdk');
const app = express();


// Middleware para convertir a json los retornos de las peticiones. 
app.use(express.json())

// Solo en DESA usamos morgan con perfil = 'dev'
if (process.env.NODE_ENV == "development") {
    console.log('entro...');
    
   app.use(morgan('dev'))     
}

// Se crea middleware de prueba para ver que funciona
app.use( (req, res, next)  => {
    console.log('Entrando al middleware');
    next()
})


app.use('/clientes', clienteRoutes)
app.use('/reservas', servicesRoutes)
app.use('/servicios', servicesRoutes)
app.use('/tarifas', ratesRoutes)
app.use('/calendario', servicesRoutes)

// Se crea peticion .get de prueba para ver si funciona. 
app.get('/', (req, res)=> {
    res.send('Hola mundo!!')
})

module.exports = app