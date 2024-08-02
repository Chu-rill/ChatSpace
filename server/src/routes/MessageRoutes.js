const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/MessageController");
const protectRoute = require("../middleware/protectRoute");
const messageRoutes = express.Router();

messageRoutes.post("/send/:id", protectRoute, sendMessage);
messageRoutes.get("/:id", protectRoute, getMessages);
module.exports = messageRoutes;
