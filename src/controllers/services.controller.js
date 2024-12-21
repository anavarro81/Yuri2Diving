const Service = require('../models/clientes.model');
const validateService = require('../utils/validator/validateService');

const newService = async (req, res) => {

    try {

        const  validService  = validateService(req.body);    
        if (validService.error) {
            return res.status(400).json(validClient);
        }
        
        const newService = new Service(req.body);
        const serviceCreated = await newService.save();
        return res.status(201).json(serviceCreated);                
    
    } catch (error) {
        return res.status(500).json(error);
    }

}