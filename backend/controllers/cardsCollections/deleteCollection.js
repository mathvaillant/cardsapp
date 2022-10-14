const CardCollection = require('../../models/cardCollectionModel');

exports.deleteCollection = (req, res, next) => {
  try {
    CardCollection.findOneAndRemove({ _id: req.params.id }, function(err, collection) {
      collection.remove(); // Call remove in order to fire the model hook
    });

    res.status(204).json({
      status: 'success',
      message: 'Collection successfully deleted!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};