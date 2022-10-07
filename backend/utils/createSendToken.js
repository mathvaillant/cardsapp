const { signToken } = require("./signToken");

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const data ={
    user: {
      token,
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      cards: user.cards,
      collections: user.collections,
    }
  }
  
  return res.status(statusCode).json({
    status: 'success',
    data,
  });
};