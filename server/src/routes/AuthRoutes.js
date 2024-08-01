const express = require("express");

const authRoutes = express.Router();

authRoutes.get("/login", (req, res) => {
  res.send("user login");
});

module.exports = authRoutes;
