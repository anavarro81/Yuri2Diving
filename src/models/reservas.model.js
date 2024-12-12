const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    fecha: { type: Date, required: true },
    servicio: { 
        type: Schema.Types.ObjectId, 
        ref: 'Servicio', 
        required: true 
    },
    cliente: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    estado: { 
        type: String, 
        default: "pendiente de pago", 
        enum: ["pendiente", "confirmada", "anulada", "rechazada", "confirmada"] 
    },
    fechaTopePago: { type: Date, required: true },
 });

const reserva = mongoose.model("Reserva", reservaSchema);

module.exports = reserva;