const { signToken } = require("./signToken");

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  return res.status(statusCode).json({
    status: 'success',
    data: {  
      user: {
        ...user,
        token
      }
    }
  });
};