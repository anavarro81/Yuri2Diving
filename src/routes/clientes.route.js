const express = require("express");
const {nuevoCliente} = require("../controllers/clientes.controller");
const clienteRoutes = express.Router();

clienteRoutes.post("/nuevo-cliente", nuevoCliente);


module.exports = clienteRoutes