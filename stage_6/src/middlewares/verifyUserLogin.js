const { findUserByEmail } = require('../utils/helpers');
const { comparePassword } = require('../utils/bcrypt');


const verifyUserLogin = async function (req, res, next) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    // console.log(user);
    

    if (user === null) return res.status(401).json({
        error: true,
        message: 'Incorrect email address, User does not exist',
    });
    console.log('email passed...')
    
    const result = await comparePassword(password, user.password)
    console.log(result);
    
    if (!result)  return res.status(401).json({
        error: true,
        message: 'Incorrect password, User does not exist',
    }); ;
    console.log('password passed...')
    
    req.user = user;
    next();
    
}


module.exports = {
    verifyUserLogin,
}