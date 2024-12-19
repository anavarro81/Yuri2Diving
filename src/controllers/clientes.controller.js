const Cliente = require('../models/clientes.model');
const {validateClient} = require('../utils/validator');

const nuevoCliente = async (req, res) => {



    try {

        const validClient = await validateClient(req.body);

        if (validClient.error) {
            return res.status(400).json(validClient);
        }
    
        const nuevoCliente = new Cliente(req.body);
        const clienteCreado = await nuevoCliente.save();
        return res.status(201).json(clienteCreado);            
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = {nuevoCliente}