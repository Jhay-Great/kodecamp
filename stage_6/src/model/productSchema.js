const mongoose= require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: String,
    }
})


const productModel = mongoose.model('product', productSchema);
// const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = productModel;