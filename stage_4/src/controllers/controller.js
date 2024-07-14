const { userRegistration, verifyUserLogin, generateUserToken, authenticatePasswordVerification, changePassword, userInfo } = require("../model/mode");
const { jwtToken, verifyJwtToken } = require("../utils/jwt");


const registration = async (req, res) => {
    try {
        const { fullName: name, email, password } = req.body;
    
        const response = await userRegistration({name, email, password});
        
        
        res.status(201).json({
            success: true,
            message: response,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error, kindly contact admin at www.kodeCamp.org'
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const response = await verifyUserLogin({email, password});

        if (typeof response === 'undefined' || !response) return res.status(401).json({
            error: true,
            message: 'User does not exist, kindly sign up',
        })

        // on success issue user token
        const {id} = response;

        const token = await jwtToken({email, id});

        res.status(200).json({
            success: true,
            token,
            message: 'user verified'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error, kindly contact admin at www.kodeCamp.org'
        })
    }
}

const forgottenPassword = (req, res) => {
    try {
        const { email } = req.body;
        const response = generateUserToken(email); 
    
        // console.log(response);
    
        res.status(201).json({
            success: true,
            message: `Reset link sent to your email`,
            alt: `http://localhost:8080/stage4/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error, kindly contact admin at www.kodeCamp.org'
        })
    }

}

const resetPassword = async (req, res) => {
    try {
        const {token} = req.query;
        const response = authenticatePasswordVerification(token);
        
        const { user } = response;
        if (user.length === 0) return res.status(404).json({
            error: true,
            message: `Page not found`,
        })
    
        // changing the password
        const { newPassword } = req.body;
        const resetPasswordResponse = await changePassword(user, newPassword);
        
        
        res.status(200).json({
            success: true,
            message: resetPasswordResponse,
        })
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error, kindly contact admin at www.kodeCamp.org'
        })
    }

}

const protected = async (req, res) => {
    const data = req.headers['authorization'];
    const token = data && data.split(' ')[1];

    
    const response = await verifyJwtToken(token);
    const { email } = response;

    const user = userInfo(email);
    console.log(user);


    res.status(200).json({
        success: true,
        message: user,
    })
}

module.exports = {
    registration,
    login,
    forgottenPassword,
    resetPassword,
    protected,
}