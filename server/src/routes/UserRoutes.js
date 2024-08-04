const express = require("express");
const userRoutes = express.Router();
const protectRoute = require("../middleware/protectRoute");
const {
  getUserForSidebar,
  editProfile,
} = require("../controllers/UserController");

userRoutes.get("/", protectRoute, getUserForSidebar);
userRoutes.put("/update/:id", protectRoute, editProfile);
module.exports = userRoutes;
