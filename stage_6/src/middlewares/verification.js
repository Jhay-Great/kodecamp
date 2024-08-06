const authenticatePasswordVerification = require('./authenticateToken');

const verifyUserPasswordToken = async function (req, res) {
    const { token } = req.query;
    const { password } = req.body;

    const response = await authenticatePasswordVerification(token);
    console.log(response);
    
    
}