const User = require('../../models/userModel');
const APIQuery = require("../../utils/APIQuery");

exports.getAllUsers = async(req, res, next) => {
  try {
    const page = Math.abs(req.query.page || 0) || 1;
    const limit = Math.abs(req.query.limit || 0) || 10;
    const searchValue = req?.query?.searchValue?.trim() !== '' ? req.query.searchValue : null;

    const options = {
      ...({ _id: { $ne: req.user._id } }),
      ...(searchValue && { name: { $regex: searchValue, $options : 'i' },
      })
    }

    const Users = await User 
      .find(options)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalDocs = await User.find(options).count();
    const totalPages = Math.ceil(totalDocs / limit);
    const totalOnPage = Users.length;

    res.status(200).json({
      status: 'success',
      message: 'Users successfully retrieved',
      totalDocs,
      totalPages,
      totalOnPage,
      data: Users
    });
  } catch (error) {
    next(error);
  }
};