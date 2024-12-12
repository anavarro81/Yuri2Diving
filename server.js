const  mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')



const BD = process.env.BD


// Conectar a la base de datos de Mongo. 
mongoose.connect(BD,{
    useNewUrlParser: true, 
}).then ( () => console.log('Conexion correcta'))

// Se indica el puerto de conecion guardado en config.env, si no existe se usa el 3000
const port = process.env.PORT || 3000


app.listen(port, () => (console.log(`Listening on port ${port}`)))