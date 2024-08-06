const { database } = require('../model/user.model');

const verifyUserLogin = async function (req, res, next) {
    const { email, password } = req.body;

    const response = database.find(user => user.email === email && user.password === password);

    
    if (typeof response === 'undefined') return res.status(401).json({
        error: true,
        message: 'User does not exist',
    }); 

    const { id, email: userEmail} = response;
    req.user = {id, userEmail};
    next();
}


module.exports = {
    verifyUserLogin,
}