const CardCollection = require('../../models/cardCollectionModel');

exports.getAllCollections = async (req, res, next) => {
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

    const Collections = await CardCollection 
      .find(options)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalDocs = await CardCollection.find(options).count();
    const totalPages = Math.ceil(totalDocs / limit);
    const totalOnPage = Collections.length;

    res.status(200).json({
      status: 'success',
      message: 'Collections successfully retrieved',
      totalDocs,
      totalPages,
      totalOnPage,
      data: Collections
    });
  } catch (error) {
    next(error);
  }
};