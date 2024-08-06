const { userRegistration } = require("../model/user.model");
const { verifyUserLogin } = require("../middlewares/verifyUserLogin");
const { jwtToken } = require("../utils/jwt");

const register = async function (req, res) {
  try {
    const response = await userRegistration(req.body);

    res.status(201).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message:
        "Internal server error, kindly contact admin at www.kodeCamp.org",
    });
  }
};

const login = async function (req, res) {
  try {
    const { id, userEmail: email } = req.user;

    const token = await jwtToken({ email, id });
    // const updatingUserDetails = await findAndUpdateUserDetails({id}, {protectedRouteToken: token});

    res.status(200).json({
      success: true,
      token,
      message: "user verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message:
        "Internal server error, kindly contact admin at www.kodeCamp.org",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const response = await authenticatePasswordVerification(token);

    console.log("response from model: ", response);
    if (response === null)
      return res.status(404).json({
        error: true,
        message: "Can not access this route",
      });

    const { user } = response;

    // changing the password
    const { newPassword } = req.body;
    const resetPasswordResponse = await changePassword(user, newPassword);

    res.status(200).json({
      success: true,
      message: resetPasswordResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message:
        "Internal server error, kindly contact admin at www.kodeCamp.org",
    });
  }
};

module.exports = {
  register,
  login,
  resetPassword,
};
