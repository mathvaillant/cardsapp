const User = require('../../models/userModel');
const APIQuery = require("../../utils/APIQuery");

exports.getAllUsers = async(req, res, next) => {
  try {
    const mongooseQuery = User.find({ _id: { $ne: req.user._id } });
    const apiQuery = new APIQuery(mongooseQuery, req.query).filter().paginate();
    const result = await apiQuery.mongooseQuery;  

    res.status(200).json({
      status: 'success',
      results: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};