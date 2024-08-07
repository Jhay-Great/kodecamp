const mongoose= require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
    }
})


const productModel = mongoose.model('product', productSchema);
// const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = productModel;