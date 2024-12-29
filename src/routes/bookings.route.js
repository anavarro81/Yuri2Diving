const Service = require("../models/services.model");

const newService = async (req, res) => {
    try {
        
        const validClient = await validateClient(req.body);
        
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({ service });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}