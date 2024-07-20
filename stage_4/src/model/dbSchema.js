const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    protectedRouteToken: {
        type: String,
    }
})

const resetPasswordSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    }
})

const userModel = mongoose.model('kodecampUser', userSchema);
const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = {
    userModel,
    resetPasswordModel,
};