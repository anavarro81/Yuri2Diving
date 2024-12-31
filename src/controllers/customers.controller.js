const Customer = require('../models/customer.model');
const {validateClient} = require('../utils/validator');

const newCustomer = async (req, res) => {



    try {

        const validCustomer = await validateClient(req.body);

        if (validCustomer.error) {
            return res.status(400).json(validCustomer);
        }
    
        const newCustomer = new Cliente(req.body);
        const clienteCreado = await newCustomer.save();
        return res.status(201).json(clienteCreado);            
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = {newCustomer}