const uuid = require('uuid');

// local db
const { database } = require('../model/user.model');

const generateUserToken = async function(email) {
    const [user] = queryByEmail(email);
    // const user = await findUserByEmail(email); // for mongodb
    console.log(user);
    // console.log(user, user.id);

    const { id } = user;
    const resetToken = uuid.v4();
    const userDetail = {
        userId: id,
        token: resetToken,
    }
    // resetDatabase.push(userDetail);
    // const resetDB = await resetPasswordModel.create(userDetail); for mongodb

    console.log(userDetail);

    return resetToken;
}


// HELPER FUNCTIONS
const queryByEmail = (email) => database.filter(user => user.email === email);
const findUserByEmail = async (email) => await userDb.findOne({email});
const findAndUpdateUserDetails = async (user, updateData) => await userDb.findOneAndUpdate(user, updateData, {new: true});


module.exports = generateUserToken;