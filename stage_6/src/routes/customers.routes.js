const express = require('express');

// local imports
const { allProducts, productItem, productCheckout } = require('../controllers/customer.controller');
const { verifyCustomerCredentials } = require('../middlewares/verification');


const customerRouter = express.Router();

// GET all product
customerRouter.get('/products', allProducts);

// GET single product
customerRouter.get('/product/:productId', productItem);

// POST checkout products
customerRouter.post('/checkout', verifyCustomerCredentials, productCheckout);


module.exports = customerRouter;


