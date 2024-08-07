const uuid = require('uuid');
const { userModel, resetPasswordModel } = require('../model/userSchema');

// finding user by email
const findUserByEmail = async (email) => await userModel.findOne({email});

// find and update user
const findAndUpdateUserDetails = async (user, updateData) => await userModel.findOneAndUpdate(user, updateData, {new: true});

// generate id
const generateId = function () {
    return uuid.u4();
}


module.exports = {
    findUserByEmail,
    findAndUpdateUserDetails,
    generateId,
}