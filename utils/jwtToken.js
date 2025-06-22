const sendToken = async(user, statusCode, res, message) => {
    const token = await user.getJwtToken();
    res.status(statusCode).cookie("token", token).json({
      success: true,
      user,
      message,
      token,
    });
  };
export default sendToken;