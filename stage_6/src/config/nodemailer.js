const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.SERVICE_PASSWORD,
  },
});


const resetPasswordSendMail = async function (user, message) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name: 'kodecamp stage_6',
      address: process.env.SERVICE_EMAIL,
    }, // sender address
    to: user, // list of receivers
    subject: "Password reset url", // Subject line
    text: "Reset your password using the url below, click or copy and paste to be redirected.", // plain text body
    html: `
    <p>Reset your password using the url below, click or copy and paste to be redirected.</p>
    <a href="#"> ${message} </a>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


module.exports = {
  resetPasswordSendMail,
}


