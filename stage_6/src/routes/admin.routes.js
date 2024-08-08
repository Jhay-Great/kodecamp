const express = require('express');

// local imports
const { verifyUserIsAdmin } = require('../middlewares/verification');
const { uploadProduct, updateProduct, viewProduct, deleteProduct } = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.use(verifyUserIsAdmin);
// POST products
adminRouter.post('/product', uploadProduct)

// PUT edit product
adminRouter.put('/update-product', updateProduct);

// // GET view product
adminRouter.get('/view-product', viewProduct);

// // DELETE product
adminRouter.delete('/delete-product', deleteProduct);



module.exports = adminRouter;


// register, login, reset their password, add products, edit products, view, and delete products