const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/AuthRoutes");
const messageRoutes = require("./src/routes/MessageRoutes");
const userRoutes = require("./src/routes/UserRoutes");
const port = process.env.PORT;
const { app, server } = require("./src/socket/socket");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";

const _dirname = path.resolve();
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to the database");
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});
