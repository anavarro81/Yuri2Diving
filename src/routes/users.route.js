const express = require("express");
const {createUser} = require("../controllers/users.controller");
const userRouters = express.Router();

userRouters.post("/nuevo-cliente", createUser);


module.exports = userRouters;