const mongoose= require('mongoose');


// const UserDetails = mongoose.Schema({
//     id: {
//         type: String,
//         required: true,
//     }
// })

const OrderSchema = mongoose.Schema({
    orderId: { 
        type: String, 
        required: true
    },
    orders: {
        type: Object,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } 
});



const orderModel = mongoose.model('order', OrderSchema);

module.exports = orderModel;