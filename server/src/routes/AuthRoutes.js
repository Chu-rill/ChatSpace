const express = require("express");
const { signup, login, logout } = require("../controllers/AuthController");
const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/logout/:userId", logout);

module.exports = authRoutes;
