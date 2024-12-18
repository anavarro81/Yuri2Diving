const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombreApellidos: {type: String},
    telefono: {type:String},
    correo: {type:String},
    documentacion: [
        {
            tipo: {type: String, enum: ['DNI', 'CIF', 'TituloBuceo', 'SeguroBuceo'] },
            url_documento: {type: String},
        }
    ],
    validado: {type: Boolean, default: false},
    tipoCliente: {type: String, enum: ['Particular', 'Empresa', 'Club']},
});

clienteSchema.methods.validateCliente = async function(req){
    
    console.log('Validando cliente...');
    console.log(req.body);
}

const cliente = mongoose.model("Cliente", clienteSchema);
module.exports = cliente;