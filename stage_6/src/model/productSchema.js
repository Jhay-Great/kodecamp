const mongoose= require('mongoose');


const ProductSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
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
    },
})

const UploadedBySchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [ProductSchema],
});

const productSchema = mongoose.Schema({
    uploadedBy: { 
        type: UploadedBySchema, 
        required: true
    }
});



const productModel = mongoose.model('product', productSchema);
// const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = productModel;