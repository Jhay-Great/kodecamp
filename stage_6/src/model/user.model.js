const { hashPassword } = require('../utils/bcrypt');
const uuid = require('uuid');

// local imports
// Schema
const { userModel, resetPasswordModel } = require('./userSchema');

const userRegistration = async function (data) {
    const {name, email, password, admin = false} = data;
    const registeredUser = {
        id: uuid.v4(),
        fullName: name,
        email,
        password: await hashPassword(password),
        admin,
    };

    const response = await userModel.create(registeredUser);
    console.log('response from remote db', response);
    
    return registeredUser;
}


const changePassword = async function (user, password) {
    const {userId} = user;
    const updatedPassword = await hashPassword(password);

    // this is where the change occurs
    await userModel.findOneAndUpdate({id: userId}, {password: updatedPassword})

    // clearing the reset password db
    await resetPasswordModel.deleteOne({userId});
    
    return 'Password successfully reset'
}

const resetPassword = async function (data) {
    return await resetPasswordModel.create(data)
}

const findToken = async function (token) {
    return await resetPasswordModel.findOne(token);
}


module.exports = {
    userRegistration,
    changePassword,
    resetPassword,
    findToken,
}