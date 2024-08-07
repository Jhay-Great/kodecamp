const express = require("express");
const baseRoutes = express.Router();

// routes
const customerRoutes = require("./customers.routes");
const adminRoutes = require("./admin.routes");

// middleware
const { verifyUserLogin } = require("../middlewares/verifyUserLogin");
const forgottenPassword = require("../middlewares/forgottenPassword");
const {verifyUserPasswordToken} = require('../middlewares/verification');

// controller
const {
  register,
  login,
  resetPassword,
} = require("../controllers/index.controller");

// all users
baseRoutes.post("/register", register);
baseRoutes.post("/login", verifyUserLogin, login);
baseRoutes.post("/forgotten-password", forgottenPassword);
baseRoutes.post("/reset-password", verifyUserPasswordToken ,resetPassword);

// admin routes
baseRoutes.use("/admin", adminRoutes);

// customer routes
baseRoutes.use("/customer", customerRoutes);

module.exports = baseRoutes;
