const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/AuthRoutes");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

let URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/auth", authRoutes);