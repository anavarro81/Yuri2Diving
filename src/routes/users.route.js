const express = require("express");
const {createUser} = require("../controllers/users.controller");
const userRouters = express.Router();

userRouters.post("/new-user", createUser);


module.exports = userRouters;