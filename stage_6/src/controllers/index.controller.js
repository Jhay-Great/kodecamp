const { userRegistration, changePassword } = require("../model/user.model");
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
    const { id, userEmail: email, admin} = req.user;

    const token = await jwtToken({ email, id, admin });
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
    const { user } = req;

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
