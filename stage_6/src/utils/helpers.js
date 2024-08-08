const uuid = require('uuid');
const { userModel, resetPasswordModel } = require('../model/userSchema');

// finding user by email
const findUserByEmail = async (email) => await userModel.findOne({email});
const findRequiredData = async (dbCollection, searchObject) => await dbCollection.findOne(searchObject);

// find and update user
const findAndUpdateUserDetails = async (user, updateData) => await userModel.findOneAndUpdate(user, updateData, {new: true});

const findAndUpdateDetails = async (db, searchQuery, updateData) => await db.findOneAndUpdate(searchQuery, updateData, {new: true});

// generate id
const generateId = function () {
    return uuid.v4();
}

// format price
const formatPrice = function (price) {
    const number = price.split('$')[1];
    return number;
}

module.exports = {
    findUserByEmail,
    findAndUpdateUserDetails,
    findAndUpdateDetails,
    generateId,
    formatPrice,
    findRequiredData,
}