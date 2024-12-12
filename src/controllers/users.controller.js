const User = require('../models/user.model')

const createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        
        return res.status(500).json(error)

}}

module.exports = {createUser}