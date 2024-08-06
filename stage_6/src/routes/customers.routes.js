const express = require('express');

// local imports
const { register } = require('../controllers/customer.controller');

const customerRouter = express.Router();

// customerRouter.post('/register', register);


module.exports = customerRouter;


// register, login, reset their password, view all products, view a single product, checkout with products