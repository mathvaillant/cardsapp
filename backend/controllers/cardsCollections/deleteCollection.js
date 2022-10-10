const CardCollection = require('../../models/cardCollectionModel');

exports.deleteCollection = async (req, res, next) => {
  try {
    // 1 - Delete collection
    await CardCollection.findByIdAndDelete(req.params.id);

    // 2 - Delete collectionId from all cards which were children of this collection

    res.status(204).json({
      status: 'success',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};