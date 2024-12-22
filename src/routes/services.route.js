const express = require("express");
const {newService} = require("../controllers/services.controller");

const servicesRoutes = express.Router();



servicesRoutes.post("/new-service", newService);

module.exports = servicesRoutes;