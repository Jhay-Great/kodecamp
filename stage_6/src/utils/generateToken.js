const uuid = require('uuid');

// local db
const { resetPassword } = require('../model/user.model');
const { findUserByEmail } = require('./helpers');

const generateUserToken = async function(email) {
    const user = await findUserByEmail(email); // for mongodb
    // console.log(user);

    const { id } = user;
    const resetToken = uuid.v4();
    const userDetail = {
        userId: id,
        token: resetToken,
    }

    const resetDB = await resetPassword(userDetail); // for mongodb
    // const resetDB = await resetPasswordModel.create(userDetail); // for mongodb

    console.log(resetDB);

    return resetToken;
}



module.exports = generateUserToken;