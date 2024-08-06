const resetDatabase = require('../model/user.model');

const authenticatePasswordVerification = async (token) => {
    const user = resetDatabase.filter(user => user.resetToken === token);

    // const user = await resetPasswordModel.findOne({token}); // for mongodb

    // console.log(user);

    if (user === null) return user;

    // console.log('run')

    return {
        user,
        message: 'under construction',
    }
}

module.exports = authenticatePasswordVerification;