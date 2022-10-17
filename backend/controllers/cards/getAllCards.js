const Card = require('../../models/cardModel');

exports.getAllCards = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const page = Math.abs(req.query.page || 0) || 1;
    const limit = Math.abs(req.query.limit || 0) || 10;
    const searchValue = req?.query?.searchValue?.trim() !== '' ? req.query.searchValue : null;

    const options = {
      ...(!isAdmin && { createdBy: req.user._id }),
      ...(searchValue && { name: { $regex: searchValue, $options : 'i' },
      })
    }

    const Cards = await Card
      .find(options)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalDocs = await Card.find(options).count();
    const totalPages = Math.ceil(totalDocs / limit);
    const totalOnPage = Cards.length;

    res.status(200).json({
      status: 'success',
      message: 'Cards successfully retrieved',
      totalDocs,
      totalPages,
      totalOnPage,
      data: Cards
    });
  } catch (error) {
    next(error);
  }
};