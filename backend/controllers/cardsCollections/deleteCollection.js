const CardCollection = require('../../models/cardCollectionModel');

exports.deleteCollection = async (req, res, next) => {
  try {
    await CardCollection.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};