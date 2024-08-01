const express = require("express");
const { signup, login } = require("../controllers/AuthController");
const authRoutes = express.Router();

authRoutes.get("/login", login);
authRoutes.post("/signup", signup);

module.exports = authRoutes;
//18.25
