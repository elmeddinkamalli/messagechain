const express = require("express");
const userRoute = require("./modules/user/userRoute");

const app = express.Router();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1/user", userRoute);
app.all("/*", (req, res) =>
  res.status(404).json({ message: "Invalid Request" })
);

module.exports = app;
