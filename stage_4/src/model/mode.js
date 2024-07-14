// imports
const uuid = require('uuid');


// local imports
const { hashPassword, comparePassword } = require('../utils/bcrypt');


const database = [
    {id: 'a900sa3', name: 'Alice', email: 'aa@gmail.com', password: 'sdf3a38a'},
];

const resetDatabase = [];

const userRegistration = async function (data) {
    const {name, email, password} = data;
    const registeredUser = {
        id: uuid.v4(),
        name,
        email,
        password: await hashPassword(password),
    };

    database.push(registeredUser);
    
    return registeredUser;
}

const verifyUserLogin = async function (data) {
    const {email, password} = data;
    const [ user ] = queryByEmail(email);

    // console.log(undefined === false);

    if (typeof user === 'undefined') return user;
    
    const result = await comparePassword(password, user.password)

    if (!result) return result;
    
    return user;

}

const generateUserToken = function(email) {
    const [user] = queryByEmail(email);
    console.log(user);

    const { id } = user;
    const resetToken = uuid.v4();
    const userDetail = {
        id,
        resetToken,
    }
    resetDatabase.push(userDetail);

    return resetToken;
}

const authenticatePasswordVerification = (token) => {
    const user = resetDatabase.filter(user => user.resetToken === token);
    // console.log(user);

    return {
        user,
        message: 'under construction',
    }
}

const changePassword = function (user, password) {
    const [{id: userId}] = user;

    const [userData] = database.filter(user => user.id === userId );
    

    // const initialPassword = userData.password;
    
    // this is where the change occurs
    userData.password = hashPassword(password),

    // console.log('comparison: ', initialPassword, password);
    
    console.log('current user data: ', userData);
    // console.log('current db: ', database);

    return 'Password successfully reset'
}




// HELPER FUNCTIONS
// const queryByEmail = function (email) {
//     const result = database.filter(user => {
//         // console.log('user email: ', user.email, 'sent email: ', email);
//         console.log(user.email === email);
//         return user.email === email
//     });
//     console.log( result );
//     return result;
// }

const queryByEmail = (email) => database.filter(user => user.email === email);

const expiryTime = () => {
    const now = new Date();
} 


module.exports = {
    userRegistration,
    verifyUserLogin,
    generateUserToken,
    authenticatePasswordVerification,
    changePassword,
}