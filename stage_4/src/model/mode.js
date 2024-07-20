// imports
const uuid = require('uuid');
const { userModel: userDb, resetPasswordModel } = require('./dbSchema');



// local imports
const { hashPassword, comparePassword } = require('../utils/bcrypt');


const database = [
    {id: 'a900sa3', name: 'Alice', email: 'aa@gmail.com', password: 'sdf3a38a'},
];

const resetDatabase = [];

const userRegistration = async function (data) {
    const {fullName, email, password} = data;
    const registeredUser = {
        id: uuid.v4(),
        fullName,
        email,
        password: await hashPassword(password),
    };

    // const user = new user(registeredUser);
    const response = await userDb.create(registeredUser);
    console.log('response from remote db', response);
    database.push(registeredUser);
    
    return registeredUser;
}

const verifyUserLogin = async function (data) {
    const {email, password} = data;
    // const [ user ] = queryByEmail(email);

    // const user = await userDb.findOne({email});
    const user = await findUserByEmail(email);
    // console.log(user === null);

    // console.log(undefined === false);

    if (user === null) return user;
    
    const result = await comparePassword(password, user.password)

    if (!result) return result;
    
    return user;

}

const generateUserToken = async function(email) {
    // const [user] = queryByEmail(email);
    const user = await findUserByEmail(email);
    console.log(user, user.id);

    const { id } = user;
    const resetToken = uuid.v4();
    const userDetail = {
        userId: id,
        token: resetToken,
    }
    // resetDatabase.push(userDetail);
    const resetDB = await resetPasswordModel.create(userDetail);

    console.log(resetDB);

    return resetToken;
}

const authenticatePasswordVerification = async (token) => {
    // const user = resetDatabase.filter(user => user.resetToken === token);

    const user = await resetPasswordModel.findOne({token});

    // console.log(user);

    if (user === null) return user;

    // console.log('run')

    return {
        user,
        message: 'under construction',
    }
}

const changePassword = async function (user, password) {
    const {userId} = user;
    const updatedPassword = await hashPassword(password);

    // this is where the change occurs
    await userDb.findOneAndUpdate({id: userId}, {password: updatedPassword})

    // clearing the reset password db
    await resetPasswordModel.deleteOne({userId});
    
    return 'Password successfully reset'
}

const verifyToken = async function(token) {

}

const userInfo = async function (email) {

    // const [ user ] = queryByEmail(email);
    
    const user = await findUserByEmail(email);
    console.log(user);

    const {fullName, email: userEmail} = user;

    return {
        fullName,
        userEmail,
    }
}




// HELPER FUNCTIONS
const queryByEmail = (email) => database.filter(user => user.email === email);
const findUserByEmail = async (email) => await userDb.findOne({email});
const findAndUpdateUserDetails = async (user, updateData) => await userDb.findOneAndUpdate(user, updateData, {new: true});

const expiryTime = () => {
    const now = new Date();
} 


module.exports = {
    userRegistration,
    verifyUserLogin,
    generateUserToken,
    authenticatePasswordVerification,
    changePassword,
    verifyToken,
    userInfo,
    findAndUpdateUserDetails,
}