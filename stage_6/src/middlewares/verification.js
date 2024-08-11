const authenticatePasswordVerification = require('./authenticateToken');
const { verifyJwtToken } = require('../utils/jwt');

const verifyUserPasswordToken = async function (req, res, next) {
    const { token } = req.query;

    const response = await authenticatePasswordVerification(token);

    if (response === null)
        return res.status(404).json({
          error: true,
          message: "Can not access this route",
    });

    const { user } = response;

    req.user = user;
    next();
    
    
}

const verifyUserIsAdmin = async function (req, res, next) {
    try {
        const data = req.headers['authorization'];
        const token = data && data.split(' ')[1];
    
        if (token === '' || token === 'undefined') throw new Error('include user token');
        
        const { id, admin } = await verifyJwtToken(token);
    
        if (!admin) return res.status(403).json({
            error: true,
            message: `Illegal route!! You can not access this route`,
        })
    
        req.id = id;
        // console.log(req.id);
        next();
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: true,
            message: `Internal server error, kindly contact admin via www.kodecamp.org`,
        })
    }

}

const verifyCustomerCredentials = async function (req, res, next) {
    try {
        const data = req.headers['authorization'];
        const token = data && data.split(' ')[1];
    
        const { id, admin } = await verifyJwtToken(token);
        
        req.id = id;
        // console.log(req.id);
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            error: true,
            message: `Sign up/login to be able to make purchases`,
        })
    }
    
}



module.exports = {
    verifyUserPasswordToken,
    verifyUserIsAdmin,
    verifyCustomerCredentials,
};