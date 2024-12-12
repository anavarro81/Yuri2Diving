const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    tipo: { type: String, 
            required: true, 
            default: "particular",
            enum: ["particular", "empresa", "club de buceo"]
    },
    // Es obligatorio si el tipo es particular
    dni: { type: String,
           unique: true, 
           required: [function() {
                return this.tipo === "particular";
           }, "El DNI es obligatorio para particulares"]
        },
    // Es obligatorio si el tipo es particular
    tituloBuceo: {
        type: String,
        required: [function() {
            return this.tipo === "particular";
        }, "El título de buceo es obligatorio para particulares"]
    },
    // Es obligatorio si el tipo es particular
    seguroBuceo: {
        type: String,
        required: [function() {
            return this.tipo === "particular";
        }, "El seguro de buceo es obligatorio para particulares"]
    },
    telefono: {type: String, required: true },    
    edad: {type: Number, required: true},    
    email: {type: String, required: true, unique: true},


});

const user = mongoose.model("Users", userSchema);

module.exports = user;