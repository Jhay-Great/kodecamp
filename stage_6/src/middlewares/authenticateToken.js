const resetDatabase = require('../model/user.model');

const { findToken } = require('../model/user.model');

const authenticatePasswordVerification = async (token) => {

    const user = await findToken({token}); // for mongodb
    // const user = await resetPasswordModel.findOne({token}); // for mongodb

    if (user === null) return user;

    return {
        user,
        message: 'under construction',
    }
}

module.exports = authenticatePasswordVerification;