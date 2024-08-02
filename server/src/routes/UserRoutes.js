const express = require("express");
const userRoutes = express.Router();
const protectRoute = require("../middleware/protectRoute");
const { getUserForSidebar } = require("../controllers/UserController");

userRoutes.get("/", protectRoute, getUserForSidebar);
module.exports = userRoutes;
