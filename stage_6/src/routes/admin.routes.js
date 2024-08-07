const express = require('express');

// local imports
const { verifyUserIsAdmin } = require('../middlewares/verification');
const { uploadProduct } = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.use(verifyUserIsAdmin);
// POST products
adminRouter.post('/product', uploadProduct)

// PUT edit product
// adminRouter.put();

// // GET view product
// adminRouter.get();

// // DELETE product
// adminRouter.delete();



module.exports = adminRouter;


// register, login, reset their password, add products, edit products, view, and delete products