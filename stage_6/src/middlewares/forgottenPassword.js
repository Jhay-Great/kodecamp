const generateUserToken = require('../utils/generateToken');
const { resetPasswordSendMail } = require('../config/nodemailer');

const forgottenPassword = async function (req, res) {
    try {
        const { email } = req.body;
        const response = await generateUserToken(email); 

        const message = `http://localhost:8080/stage6/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
        await resetPasswordSendMail(email, message)
    
        res.status(201).json({
            success: true,
            message: `Reset link sent to your email`,
            // alt: `http://localhost:8080/stage6/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
            // alt: `https://kodecamp-stage6.onrender.com/stage4/reset-password?token=${response}` // for the sake of not using nodemail and an email to retrieve sent mails
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error, kindly contact admin at www.kodeCamp.org'
        })
    }

}

module.exports = forgottenPassword