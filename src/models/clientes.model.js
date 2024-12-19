const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    fullName: {type: String},
    
    // Empresas
    responsable: {type: String},
    nombreComercial: {type: String},
    
    phone: {type:String},
    email: {type:String},
    documentation: [
        {
            tipo: {type: String, enum: ['DNI', 'CIF', 'TituloBuceo', 'SeguroBuceo'] },
            url_documento: {type: String},
        }
    ],
    validated: {type: Boolean, default: false},
    ClientType: {type: String, enum: ['Particular', 'Empresa', 'Club']},
});


const cliente = mongoose.model("Cliente", clienteSchema);
module.exports = cliente;