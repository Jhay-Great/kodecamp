const { userRegistration, verifyUserLogin, generateUserToken, authenticatePasswordVerification, changePassword, userInfo, findAndUpdateUserDetails } = require("../model/mode");
const { jwtToken, verifyJwtToken } = require("../utils/jwt");


const registration = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
    
        const response = await userRegistration({fullName, email, password});
        
        
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

        // console.log('login controller: ', response);

        if (typeof response === 'undefined' || !response) return res.status(404).json({
            error: true,
            message: 'User does not exist, kindly sign up',
        })

        // on success issue user token
        const {id} = response;

        const token = await jwtToken({email, id});
        const updatingUserDetails = await findAndUpdateUserDetails({id}, {protectedRouteToken: token});

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

const forgottenPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await generateUserToken(email); 
    
        // console.log(response);
    
        res.status(201).json({
            success: true,
            message: `Reset link sent to your email`,
            // alt: `http://localhost:8080/stage4/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
            alt: `https://kodecamp-stage4.onrender.com/stage4/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
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
        const response = await authenticatePasswordVerification(token);

        console.log('response from model: ', response);
        if (response === null) return res.status(404).json({
            error: true,
            message: 'Can not access this route' 
        })
        
        const { user } = response;
        // if (user.length === 0) return res.status(404).json({
        //     error: true,
        //     message: `Page not found`,
        // })
    
        // changing the password
        const { newPassword } = req.body;
        const resetPasswordResponse = await changePassword(user, newPassword);
        
        
        res.status(200).json({
            success: true,
            message: resetPasswordResponse,
        })
        
    } catch (error) {
        console.log(error);
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

    const user = await userInfo(email);

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