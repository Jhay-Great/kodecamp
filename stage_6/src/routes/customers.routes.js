const express = require('express');

// local imports
const { allProducts, productItem, productCheckout } = require('../controllers/customer.controller');


const customerRouter = express.Router();

// GET all product
customerRouter.get('/products', allProducts);

// GET single product
customerRouter.get('/product/:productId', productItem)

// POST checkout products
customerRouter.post('/purchase-product', productCheckout)


module.exports = customerRouter;


// register, login, reset their password, view all products, view a single product, checkout with products