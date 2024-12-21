const  express = require('express');
const morgan = require('morgan')
const clienteRoutes = require('./src/routes/clientes.route')

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
app.use(('/servicios/'))

// Se crea peticion .get de prueba para ver si funciona. 
app.get('/', (req, res)=> {
    res.send('Hola mundo!!')
})

module.exports = app