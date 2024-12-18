const Cliente = require('../models/clientes.model');

const nuevoCliente = async (req, res) => {

    Cliente.validateCliente(req);

    try {
        const nuevoCliente = new Cliente(req.body);
        const clienteCreado = await nuevoCliente.save();
        return res.status(201).json(clienteCreado);            
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = {nuevoCliente}